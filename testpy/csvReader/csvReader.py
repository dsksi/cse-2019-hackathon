import csv
from testpy.models import *


def readRecyclingCSV(filepath, db):
    with open(filepath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            col_count = 0
            for col in row:
                if col != '':
                    db.session.add(Recycling(
                        label_id=col,
                        method_id=col_count))
                    print(f'adding {col}')
                col_count += 1
        db.session.commit()
        print(f'Finished')


def readItemLableCSV(filepath, db):
    with open(filepath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            db.session.add(Recycling(
                        id=row[0],
                        label=row[1]))
            print(f'adding {row}')
        db.session.commit()
        print(f'Finished')
