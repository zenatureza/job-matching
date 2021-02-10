import os
from dotenv import load_dotenv
import psycopg2 as pg
import pandas.io.sql as psql

load_dotenv()


POSTGRES_DATABASE = os.environ.get('POSTGRES_DATABASE')
POSTGRES_USER = os.environ.get('POSTGRES_USERNAME')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD')
POSTGRES_HOST = os.environ.get('POSTGRES_HOST')
POSTGRES_PORT = os.environ.get('POSTGRES_PORT')

print(POSTGRES_PASSWORD)

CONNECTION_STRING = 'host={host} dbname={dbname} user={user} password={password} port={port}'.format(
    host=POSTGRES_HOST, dbname=POSTGRES_DATABASE, user=POSTGRES_USER, password=POSTGRES_PASSWORD, port=POSTGRES_PORT)
print(CONNECTION_STRING)

connection = pg.connect(CONNECTION_STRING)


def get_candidates_techs_dict():
    # dataframe = psql.read_sql('SELECT * FROM candidates_view', connection)

    candidates = psql.read_sql_query(
        'select * from candidates_view', connection)

    candidates_techs_dict = {}

    for _, row in candidates.iterrows():
        candidate_id = row['candidate_id']
        tech_id = row['technology_id']
        is_main_tech = row['is_main_tech']

        if candidate_id not in candidates_techs_dict:
            candidates_techs_dict[candidate_id] = {
                'city_id': row['city_id'],
                'state_initials': row['state_initials'],
                'start_experience_range': row['start_experience_range'],
                'end_experience_range': row['end_experience_range'],
                'technologies': {},
                'score': 0,
                'candidate_id': candidate_id,
                'city': row['city']
            }

        # candidates_techs_dict[candidate_id]['technologies'][tech_id] = is_main_tech
        candidates_techs_dict[candidate_id]['technologies'][tech_id] = {
            'is_main_tech': is_main_tech,
            'technology': row['technology']
        }

    return candidates_techs_dict


def get_best_candidates(city_id, start_experience_range, end_experience_range, technologies_ids, state_initials
                        ):
    candidates_techs_dict = get_candidates_techs_dict()

    for key in candidates_techs_dict.keys():
        candidate_data = candidates_techs_dict[key]

        # priorizes candidates in same city
        if candidate_data['city_id'] == city_id:
            candidate_data['score'] = candidate_data['score'] + 3

        # candidates from same state are also good options
        elif candidate_data['state_initials'] == state_initials:
            candidate_data['score'] = candidate_data['score'] + 2

        # priorizes candidates with exact same experience range
        if (candidate_data['start_experience_range'] == start_experience_range and
                candidate_data['end_experience_range'] == end_experience_range):
            candidate_data['score'] = candidate_data['score'] + 2

        # candidate has even more range (4-6 years or 4+ years)
        elif (candidate_data['start_experience_range'] == start_experience_range and
                (candidate_data['end_experience_range'] > end_experience_range or
                    candidate_data['end_experience_range'] == 0)):
            candidate_data['score'] = candidate_data['score'] + 1

        # candidate has a wider range
        elif (candidate_data['start_experience_range'] > start_experience_range):
            candidate_data['score'] = candidate_data['score'] + 1

        for tech in technologies_ids:
            if tech in candidate_data['technologies']:
                candidate_data['score'] = candidate_data['score'] + 3.5

                is_main_tech = candidate_data['technologies'][tech]['is_main_tech']

                if is_main_tech == True:
                    candidate_data['score'] = candidate_data['score'] + 1

            # candidates that know more languages score better
            else:
                candidate_data['score'] = candidate_data['score'] + 0.1

    return sorted(candidates_techs_dict.values(),
                  key=lambda candidate: candidate['score'], reverse=True)
