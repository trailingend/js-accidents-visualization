import pandas as pd
import numpy as np
import re
import json
import os

'''
group phases
Standing - Take-off - Climb - Cruise - Descent - Landing
Others, Unknown
'''

df = pd.read_csv('./final.csv')

for idx, row in df.iterrows():

    if pd.isnull(df.loc[idx, 'PhaseID_DisplayEng']):
        df.loc[idx, 'PhaseID_DisplayEng'] = 'Unknown'
        continue
    
    phase = row['PhaseID_DisplayEng'].lower()

    if ('standing' in phase) or ('assisted' in phase):
        phase = 'Standing'

    elif ('take-off' in phase) or ('taxi' in phase) or ('maintaining position' in phase):
        phase = 'Take-off'

    elif ('climb' in phase):
        phase = 'Climb'

    elif ('cruise' in phase) or ('manoeuvring' in phase) or ('aerobatics' in phase) or ('low flying' in phase) or ('en-route' in phase):
        phase = 'Cruise'

    elif ('descent' in phase) or ('approach' in phase) :
        phase = 'Descent'

    elif ('landing' in phase) or ('level-off' in phase):
        phase = 'Landing'

    elif ('airplane repair' in phase) or ('maintenance' in phase) or ('post-impact' in phase):
        phase = 'Others'
    
    else: #unknown, blank
        phase = 'Unknown'

    df.loc[idx, 'PhaseID_DisplayEng'] = phase

df.to_csv('./final_group.csv', index=False)

'''
group reasons
'''
# df = pd.read_csv('./final_group.csv')
# df['Reason'] = ''

# for idx, row in df.iterrows():

#     if pd.isnull(df.loc[idx, 'FullEventDescEng']):
#         df.loc[idx, 'Reason'] = 'Unknown'
#         continue
    
#     df.loc[idx, 'Reason'] = row['FullEventDescEng'].split('.')[0][1:-1]

# df.to_csv('./final_group.csv', index=False)