#!/bin/bash -l
echo "testing with puzzle of size $1"
if [ "$2" == "u" ]
then
  echo "puzzle should not be solvable"
else
  echo "puzzle should be solvable"
fi
rm temp-test.puzzle; python3 puzzle-gen.py -$2 $1 >> temp-test.puzzle && npm run solve temp-test.puzzle