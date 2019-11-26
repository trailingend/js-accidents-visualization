import pandas as pd
import numpy as np
import re
import json
import os

# time.rjust(2, '0')

'''
data for first page
'''
# df = pd.read_csv('./final.csv')
# usecols=['Year', 'TotalFatalCount', 'TotalMinorCount', 'TotalSeriousCount', 'Location', 'Latitude', 'Longtitude']
# home_line_df = df[['Year', 'TotalFatalCount', 'TotalMinorCount', 'TotalSeriousCount']]
# home_line_groups = home_line_df.groupby('Year')
# home_line = []

# for symbol, group in home_line_groups:
#     home_line_dict = {}
#     home_line_dict['year'] = str(symbol)
#     home_line_dict['occu'] = int(group.count()[0])
#     home_line_dict['fata'] = int(group['TotalFatalCount'].astype(bool).agg(np.sum))
#     home_line_dict['inju'] = int([group['TotalMinorCount'] + group['TotalSeriousCount']][0].astype(bool).agg(np.sum))
#     home_line_dict['safe'] = home_line_dict['occu'] - home_line_dict['fata'] - home_line_dict['inju']
#     home_line.append(home_line_dict)

# file = open(os.path.join('./', 'home_line'+'.txt'), 'w')
# file.write(json.dumps(home_line)) #, indent=4
# file.close()


# home_map_df = df[['Year', 'Location', 'Latitude', 'Longitude']]
# home_map_groups = home_map_df.groupby('Year')
# home_map = []

# for symbol, group in home_map_groups:
#     home_map_dict = {}
#     home_map_dict['year'] = str(symbol)
#     img_list = []
    
#     for _, item in group.iterrows():
#         item_dict = {}
#         item_dict['imageURL'] = ''
#         item_dict['title'] = str(item['Location']).capitalize() 
#         item_dict['latitude'] = item['Latitude']
#         item_dict['longitude'] = -item['Longitude']
#         img_list.append(item_dict)
#     home_map_dict['images'] = img_list
#     home_map.append(home_map_dict)

# file = open(os.path.join('./', 'home_map'+'.txt'), 'w')
# file.write(json.dumps(home_map))
# file.close()


'''
data for radar
'''
df = pd.read_csv('./final_group.csv')
radar_df = df[['Date', 'Year', 'OccTime', 'DepartAirportID_AirportName', 'DestAirportID_AirportName', 'TotalFatalCount', 'TotalMinorCount', 'TotalSeriousCount', 'PhaseID_DisplayEng',
                'AircraftMakeID_DisplayEng', 'OrganizationID_DisplayEng', 'EventID_DisplayEng']]
radar_df.fillna(-1, inplace = True)
# radar_groups = radar_df.groupby('Year')
occ_list = []
phase_dict = {
    'Unknown' : 0,
    'Standing' : 1,
    'Take-off' : 2,
    'Climb' : 3,
    'Cruise' : 4,
    'Descent' : 5,
    'Landing' : 6,
    'Others' : 7
}
airport_dict = {
    'Jean Lesage Intl' : 'Quebec City',
    'OTTAWA/GATINEAU' : 'Ottawa',
    'Lester B. Pearson Intl' : 'Toronto',
    'Vancouver Intl' : 'Vancouver',
    'Calgary Intl' : 'Calgary',
    'Victoria Intl' : 'Victoria',
    'Edmonton Intl' : 'Edmonton',
    'Pierre Elliott Trudeau Intl' : 'Montreal'
}

for _, item in radar_df.iterrows():
    item_dict = {}
    
    item_dict['date'] = str(item['Date']) + ' ' + str(item['OccTime'][0:-3]) if (item['Date']!=-1 and item['OccTime']!=-1) else 'Unknown'
    item_dict['year'] = item['Year']
    item_dict['time'] = str(item['OccTime'].split(':')[0]).rjust(2, '0') if item['OccTime']!=-1 else -1

    item_dict['depa'] = item['DepartAirportID_AirportName'] if item['DepartAirportID_AirportName']!=-1 else 'Unknown'
    item_dict['dest'] = item['DestAirportID_AirportName'] if item['DestAirportID_AirportName']!=-1 else 'Unknown'
    if item_dict['depa'] in airport_dict:
        item_dict['depa'] = airport_dict[item_dict['depa']]
    else:
        item_dict['depa'] = item_dict['depa'].title()
    if item_dict['dest'] in airport_dict:
        item_dict['dest'] = airport_dict[item_dict['dest']]
    else:
        item_dict['dest'] = item_dict['dest'].title()

    item_dict['fata'] = item['TotalFatalCount']
    item_dict['inju'] = item['TotalMinorCount'] + item['TotalSeriousCount']

    item_dict['phase'] = phase_dict[item['PhaseID_DisplayEng']] if item['PhaseID_DisplayEng']!=-1 else 0

    item_dict['manu'] = str(item['AircraftMakeID_DisplayEng']).title() if item['AircraftMakeID_DisplayEng']!=-1 else 'Unknown'
    item_dict['orga'] = str(item['OrganizationID_DisplayEng']).title() if item['OrganizationID_DisplayEng']!=-1 else 'Unknown'

    item_dict['reas'] = item['EventID_DisplayEng'] if item['EventID_DisplayEng']!=-1 else 'Unknown'

    occ_list.append(item_dict)

file = open(os.path.join('./', 'radar'+'.txt'), 'w')
file.write(json.dumps(occ_list, indent=4))
file.close()

'''
category
'''
# cat_df = pd.read_csv('./final_group.csv', usecols=['FullEventDescEng'])
# cat_df.fillna('[Unknown]', inplace = True)
# cat_list = []
# cat_dict = {'name':'', 'chil':[]}
# sub_dict = {'name':'', 'chil':[]}

# cat_groups = cat_df.groupby('FullEventDescEng')

# for symbol, _ in cat_groups:
#     news = 0
#     newc = 0
#     cat = symbol.split('.')
#     first_layer = cat[0][1:-1]
#     second_layer = cat[1][1:-1] if len(cat)>=2 else first_layer
#     last_layer = cat[-1][1:-1] if len(cat)>=3 else second_layer

#     # if name exist, enter the item
#     if cat_dict['name'] != first_layer:
#         cat_dict = {'name':first_layer, 'chil':[]}
#         newc = 1

#     if sub_dict['name'] != second_layer:
#         sub_dict = {'name':second_layer, 'chil':[]}
#         news = 1 
#     sub_dict['chil'].append(last_layer)

#     if news:
#         cat_dict['chil'].append(sub_dict)

#     if newc:
#         cat_list.append(cat_dict)

# file = open(os.path.join('./', 'category'+'.txt'), 'w')
# file.write(json.dumps(cat_list))
# file.close()






# for symbol, group in radar_groups:
#     radar_dict = {}
#     radar_dict['year'] = str(symbol)
#     occ = []
    
#     for _, item in group.iterrows():
#         item_dict = {}
#         item_dict['date'] = str(item['Date']) + ' ' + str(item['OccTime'][0:-3])
#         item_dict['time'] = str(item['OccTime'][0:-3])
#         item_dict['dist'] = item['Distance']
#         item_dict['fata'] = item['TotalFatalCount']
#         item_dict['inju'] = item['TotalMinorCount'] + item['TotalSeriousCount']
#         item_dict['phase'] = phase_dict[item['PhaseID_DisplayEng']]
#         item_dict['manu'] = str(item['AircraftMakeID_DisplayEng']).title()
#         item_dict['orga'] = str(item['OrganizationID_DisplayEng']).title()
#         item_dict['engi'] = item['NumberOfEngine']
#         item_dict['reas'] = item['Reason']
#         occ.append(item_dict)

#     radar_dict['occurances'] = occ
#     radar.append(radar_dict)

# file = open(os.path.join('./', 'radar'+'.txt'), 'w')
# file.write(json.dumps(radar))
# file.close()