import pandas as pd
import numpy as np
import re
import json
import os

'''
airmaker ranking
'''
# df = pd.read_csv('./final_group.csv')
# ranking_df = df[['Year', 'OccTime', 'AircraftMakeID_DisplayEng', 'OrganizationID_DisplayEng']]
# ranking_df.fillna(-1, inplace = True)
# ranking_groups = ranking_df.groupby('Year')

# # AircraftMake Current	Historic
# manu_fleet_df = pd.read_csv('./manu_fleet.csv') # org_fleet.csv
# manu_hist_dict = dict(zip(manu_fleet_df.AircraftMake, manu_fleet_df.Historic)) # Organization
# manu_curr_dict = dict(zip(manu_fleet_df.AircraftMake, manu_fleet_df.Current)) # Organization

# manu_list = []

# for year, year_group in ranking_groups: 
#     manu_dict = {}
    
#     manu_dict['year'] = str(year)
#     manu_dict['manu'] = [] # orga

#     aircraftmake = year_group.groupby('AircraftMakeID_DisplayEng') # OrganizationID_DisplayEng
#     for maker, maker_group in aircraftmake:
#         item = {}
#         if maker in manu_hist_dict:
#             item['name'] = maker.title()
#             cnt = len(maker_group)
#             if year<2009:
#                 item['score'] = cnt/manu_hist_dict[maker] if manu_hist_dict[maker]!=0 else float(cnt)
#             else:
#                 item['score'] = cnt/manu_curr_dict[maker] if manu_curr_dict[maker]!=0 else float(cnt)
#             manu_dict['manu'].append(item) # orga

#     sorted_dict = sorted(manu_dict['manu'], key = lambda i: i['score'])
#     manu_list.append(sorted_dict)

# file = open(os.path.join('./', 'manu_ranking'+'.txt'), 'w') # orga_ranking
# file.write(json.dumps(manu_list))
# file.close()


'''
organization ranking
'''
# df = pd.read_csv('./final_group.csv')
# ranking_df = df[['Year', 'OccTime', 'AircraftMakeID_DisplayEng', 'OrganizationID_DisplayEng']]
# ranking_df.fillna(-1, inplace = True)
# ranking_groups = ranking_df.groupby('Year')

# # AircraftMake Current	Historic
# orga_fleet_df = pd.read_csv('./org_fleet.csv') # org_fleet.csv
# orga_hist_dict = dict(zip(orga_fleet_df.Organization, orga_fleet_df.Historic)) # Organization
# orga_curr_dict = dict(zip(orga_fleet_df.Organization, orga_fleet_df.Current)) # Organization

# orga_list = []

# for year, year_group in ranking_groups: 
#     orga_dict = {}
    
#     orga_dict['year'] = str(year)
#     orga_dict['orga'] = [] # orga

#     organization = year_group.groupby('OrganizationID_DisplayEng') # OrganizationID_DisplayEng
#     for orga, orga_group in organization:
#         item = {}
#         if orga in orga_hist_dict:
#             item['name'] = orga.title()
#             cnt = len(orga_group)
#             if year<2009:
#                 item['score'] = cnt/orga_hist_dict[orga] if orga_hist_dict[orga]!=0 else float(cnt)
#             else:
#                 item['score'] = cnt/orga_curr_dict[orga] if orga_curr_dict[orga]!=0 else float(cnt)
#             orga_dict['orga'].append(item) # orga

#     sorted_dict = sorted(orga_dict['orga'], key = lambda i: i['score'])
#     orga_list.append(sorted_dict)

# file = open(os.path.join('./', 'orga_ranking'+'.txt'), 'w') # orga_ranking
# file.write(json.dumps(orga_list))
# file.close()

'''
hour ranking
'''

df = pd.read_csv('./final_group.csv')
ranking_df = df[['OccTime', 'Year']]
ranking_df.fillna(-1, inplace = True)
ranking_groups = ranking_df.groupby('Year')

time_list = []

for year, year_group in ranking_groups: 
    time_dict = {'year': str(year), 'time': 0}
    temp = np.zeros(24)

    for _, item in year_group.iterrows():
        if item['OccTime']!=-1:
            time = int(item['OccTime'].split(':')[0])
            temp[time-1] += 1
    
    time_dict['time'] = str(np.argmax(temp)+1).rjust(2, '0')
    time_list.append(time_dict)

file = open(os.path.join('./', 'time_ranking'+'.txt'), 'w')
file.write(json.dumps(time_list))
file.close()