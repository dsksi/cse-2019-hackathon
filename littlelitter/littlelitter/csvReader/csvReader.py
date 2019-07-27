import csv
from littlelitter.models import *


def readCountryCSV(filepath, db):
    with open(filepath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                line_count += 1
                continue
            db.session.add(Country(
                id=row[0],
                country=row[1]
            ))
            print(f'adding {row}')
        db.session.commit()
        print(f'Finished adding labels')


def readItemLableCSV(filepath, db):
    with open(filepath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                line_count += 1
                continue
            db.session.add(RecyclingLabel(
                id=row[0],
                label=row[1]
            ))
            print(f'adding {row}')
        db.session.commit()
        print(f'Finished adding labels')


def readClassification(filepath, db, country_id):
    with open(filepath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                line_count += 1
                continue
            db.session.add(RecyclingMethod(
                id=row[0],
                method=row[1],
                detail=row[2],
                picture_link=row[3],
                country_id=country_id
            ))
            print(f'adding {row}')
        db.session.commit()
        print(f'Finished adding recycling classification')


def readRecyclingCSV(filepath, db, country_id):
    with open(filepath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                line_count += 1
                continue
            col_count = 0
            for col in row:
                if col != '':
                    db.session.add(Recycling(
                        label_id=col,
                        method_id=col_count,
                        country_id=country_id
                    ))
                    print(f'adding {col}')
                col_count += 1
        db.session.commit()
        print(f'Finished adding recycling')



