import psycopg2 as pg
import pandas.io.sql as psql
import operator

connection = pg.connect(
    "host=localhost dbname=jobmatching user=postgres password=postgres")
dataframe = psql.read_sql('SELECT * FROM candidates_view', connection)
candidates = psql.read_sql_query('select * from candidates_view', connection)

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
            'candidate_id': candidate_id
        }

    candidates_techs_dict[candidate_id]['technologies'][tech_id] = is_main_tech


def get_best_candidates():
    candidate_id = '532252df-92dd-47ab-95ea-3a725071fdaa'
    city_id = '2ee3b6cf-81c4-4b7a-abaf-e919212b277d'
    start_experience_range = 4
    end_experience_range = 5
    technologies = [
        'b2d2b12c-9759-4077-a9aa-d0156ed68ba4',
        '770d4468-83f1-427e-9bba-52b78acfcfb5'
    ]
    state_initials = 'SC'

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

        for tech in technologies:
            if tech in candidate_data['technologies']:
                candidate_data['score'] = candidate_data['score'] + 3.5

                is_main_tech = candidate_data['technologies'][tech]

                if is_main_tech == True:
                    candidate_data['score'] = candidate_data['score'] + 1

            # candidates that know more languages score better
            else:
                candidate_data['score'] = candidate_data['score'] + 0.1

    return candidates_techs_dict


result = sorted(get_best_candidates().values(),
                key=lambda candidate: candidate['score'], reverse=True)

print(result[:5])
