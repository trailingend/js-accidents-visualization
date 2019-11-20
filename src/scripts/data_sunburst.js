export const full_data = [{ 
    "depa": "YVR",
    "dest": "YYZ",
    "year": "1999", 
    // "hour": "13",
    "manufacturer": "Beoing",
    "organizer": "Air Canada",
    "reasons": [{
        "reason_cate": "Crash",
        "children": [{
            "text": "Hit something",
            "countChildren": 2,
            "occurrences": [{
                "date": "01-13 07:24",
                "fata": 0,
                "inju": 20,
                "manu": "Boeing",
                "orga": "Air Canada",
                "summary": "hit a plane"
            }, {
                "date": "01-12 07:34",
                "fata": 0,
                "inju": 20,
                "manu": "Boeing",
                "orga": "Air Canada",
                "summary": "hit a plane"
            }]
        }, {
            "text": "Hit something",
            "countChildren": 2,
            "occurrences": [{
                "date": "05-13 07:22",
                "fata": 0,
                "inju": 0,
                "manu": "Boeing",
                "orga": "Air Canada",
                "summary": "hit a bird"
            }]
        }] 
    }, {
        "reason_cate": "Aircraft",
        "children": [{
            "text": "Engine",
            "countChildren": 2,
            "occurrences": [{
                "date": "08-13 07:24",
                "time": "08:04",
                "fata": 0,
                "inju": 10,
                "manu": "AirBus",
                "orga": "Air Canada",
                "summary": "engine on hire"
            }]
        }] 
    }],
}];