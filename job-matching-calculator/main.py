import psycopg2 as pg
import pandas as pd
import pandas.io.sql as psql
import numpy as np

connection = pg.connect(
    "host=localhost dbname=jobmatching user=postgres password=postgres")
dataframe = psql.read_sql('SELECT * FROM candidates_view', connection)
candidates = psql.read_sql_query('select * from candidates_view', connection)


def get_candidates_techs_rows(candidate_id):
    mask = candidates['candidate_id'] == candidate_id
    return candidates[mask]


candidates_techs_dict = {}

techs_ids = []

for _, row in candidates.iterrows():
    candidate_id = row['candidate_id']
    tech_id = row['technology_id']
    is_main_tech = row['is_main_tech']

    techs_ids.append(tech_id)

    if candidate_id not in candidates_techs_dict:
        candidates_techs_dict[candidate_id] = {
            'city_id': row['city_id'],
            'state_initials': row['state_initials'],
            'start_experience_range': row['start_experience_range'],
            'end_experience_range': row['end_experience_range'],
            'technologies': [
                {
                    'tech_id': tech_id,
                    'is_main_tech': is_main_tech
                }
            ],
            'score': 0
        }
    else:
        candidates_techs_dict[candidate_id]['technologies'].append(
            {
                'tech_id': tech_id,
                'is_main_tech': is_main_tech
            }
        )


def get_best_candidates():
    candidate_id = '532252df-92dd-47ab-95ea-3a725071fdaa'
    city_id = '2ee3b6cf-81c4-4b7a-abaf-e919212b277d'
    start_experience_range = 4
    end_experience_range = 5
    technologies = [
        'b2d2b12c-9759-4077-a9aa-d0156ed68ba4'
    ]
    state_initials = 'RJ'

    for candidate_data in candidates_techs_dict.items():
        # priorizes candidates in same city
        if candidate_data['city_id'] == city_id:
            candidate_data['score'] = candidate_data['score'] + 1

        # candidates from same state are also good options
        elif candidate_data['state_initials'] == state_initials:
            candidate_data['score'] = candidate_data['score'] + 0.1

        # priorizes candidates with exact same experience range
        if (candidate_data['start_experience_range'] == start_experience_range and
                candidate_data['end_experience_range'] == end_experience_range):
            candidate_data['score'] = candidate_data['score'] + 2

        # candidate has even more range (4-6 years or 4+ years)
        elif (candidate_data['start_experience_range'] == start_experience_range and
                (candidate_data['end_experience_range'] > end_experience_range or
                    candidate_data['end_experience_range'] == 0)):
            candidate_data['score'] = candidate_data['score'] + 1.5

        # candidate has a wider range
        elif (candidate_data['start_experience_range'] > start_experience_range):
            candidate_data['score'] = candidate_data['score'] + 1

        # TODO: Alterar o array de tecnologias do cara pra ser um dicionário
        for tech in technologies:
            if tech in candidate_data['technologies']:
                candidate_data['score'] = candidate_data['score'] + 2

                # if candidate_data['technologies'][tech]['is_main_tech']


""" 
Creates pandas dataframe, with the following columns:
candidate_id | city_id | state_initials | start_experience_range | end_experience_range | tech_id_1 | tech_id_2 | ... | tech_id_n-1
"""
# columns = ['candidate_id', 'city_id', 'state_initials',
#            'start_experience_range', 'end_experience_range']
# unique_techs_ids = list(dict.fromkeys(techs_ids))
# columns.extend(unique_techs_ids)

# data = np.zeros((len(candidates_techs_dict), 156))
# df = pd.DataFrame(data, columns=columns)

# for i, candidate_id in enumerate(candidates_techs_dict):
#     df.loc['candidate_id', i] = candidate_id
#     df.loc['city_id', i] = candidates_techs_dict[candidate_id]['city_id']
#     df.loc['state_initials',
#            i] = candidates_techs_dict[candidate_id]['state_initials']
#     df.loc['start_experience_range',
#            i] = candidates_techs_dict[candidate_id]['start_experience_range']
#     df.loc['end_experience_range',
#            i] = candidates_techs_dict[candidate_id]['end_experience_range']

#     for candidate_tech in candidates_techs_dict[candidate_id]['technologies']:
#         if candidate_tech['tech_id'] in columns:
#             df.loc[candidate_tech['tech_id'], i] = 1
#         else:
#             df.loc[candidate_tech['tech_id'], i] = 0


# print(df['candidate_id'].values)
