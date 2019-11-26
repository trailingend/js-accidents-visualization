import pandas as pd
import numpy as np
import re

## 1
# occurrence_full = pd.read_csv('./ASISdb_MDOTW_VW_OCCURRENCE_PUBLIC.csv', usecols=['OccNo', 'OccDate', 'OccTime', 'OccTypeID_DisplayEng', 'Latitude', 'Longitude', 'TotalFatalCount',
# 'TotalMinorCount','TotalNoneCount','TotalSeriousCount','TotalUnknownCount', 'TimeZoneID_DisplayEng', 'OccIncidentTypeID_DisplayEng',
# 'OccTypeID_DisplayEng', 'Distance', 'DistanceEnumEng', 'ProvinceID_DisplayEng', 'Location'])
# # 9/13/2019 12:00:00 AM, 1999-2019
# occurrence_full['Year'] = [str(x).split(' ')[0].split('/')[2] for x in occurrence_full['OccDate']]
# occurrence_full.Year = occurrence_full.Year.astype(np.int64)

# occurrence_full['Date'] = [str(x).split(' ')[0].split('/')[0]+'/'+str(x).split(' ')[0].split('/')[1] for x in occurrence_full['OccDate']]

# occurrence = occurrence_full[(occurrence_full['Year'])>=1999]

# aircraft = pd.read_csv('./ASISdb_MDOTW_VW_AIRCRAFT_PUBLIC.csv', usecols=['OccNo', 'AircraftTypeID', 'AircraftModelID_DisplayEng', 'OperatorTypeID', 'OperationTypeID', 'AircraftMakeID_DisplayEng',
# 'YearOfManuf', 'NumberOfEngine', 'DamageLevelID_DisplayEng', 'WeightWithinLimitsEnum_DisplayEng', 'OrganizationID_DisplayEng', 'DestAirportID', 'DestAirportID_AirportName',
# 'DepartAirportID', 'DepartAirportID_AirportName'])

# left_merge = pd.merge(occurrence, aircraft, on='OccNo', how='left')
# left_merge.to_csv('./occ_aircraft.csv', index=False)

## 2
# left_merge_full = pd.read_csv('./occ_aircraft.csv')
# # 1, 5,[1,4,11]

# left_merge_half = left_merge_full[(left_merge_full['AircraftTypeID']==1) & (left_merge_full['OperatorTypeID']==5)]
# left_merge = left_merge_half[(left_merge_half['OperationTypeID']==1) | (left_merge_half['OperationTypeID']==4) | (left_merge_half['OperationTypeID']==11)]

# left_merge.to_csv('./occ_aircraft_filtered.csv', index=False)

## 3
# merge_full = pd.read_csv('./occ_aircraft_filtered.csv')
# phase = pd.read_csv('./ASISdb_MDOTW_VW_EVENTS_AND_PHASES_PUBLIC.csv', usecols=['OccNo','PhaseID_DisplayEng', 'EventID_DisplayEng', 'FullEventDescEng'])

# final_merge = pd.merge(merge_full, phase, on='OccNo', how='left')
# final_merge.to_csv('./occ_aircraft_filtered_phase.csv', index=False)

## 4
merge = pd.read_csv('./occ_aircraft_filtered_phase.csv')
merge = merge.drop_duplicates(subset='OccNo', keep='first')
merge.to_csv('./final.csv', index=False)


# count
# df = pd.read_csv('./final.csv', usecols=['OrganizationID_DisplayEng'])
# air_dict = {}
# for _, row in df.iterrows():
#     item = row['OrganizationID_DisplayEng']
#     if item in air_dict:
#         air_dict[item] += 1
#     else:
#         air_dict[item] = 1
# sorted_dict = sorted(air_dict.items(), key=lambda kv: kv[1])
# print(sorted_dict)