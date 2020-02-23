#!/bin/bash
echo "Waiting on convert UML API"
while ! nc -z convertuml 8000; do
  sleep 0.1;
done
echo "convert UML API is up"
mkdir -p ../assets/uml;
rm ../assets/uml/*
shopt -s nullglob;
for f in *.pu
do
  echo "Processing $f file...";
  FNAME=$(echo $f | sed s/\.pu//g);
  # take action on each file. $f store current file name
  curl http://convertuml:8000/plantuml/png 
    --data-binary \'@$f\'
    -o ../assets/uml/$FNAME.png;
curlexit=$?
if [ $curlexit -ne 0 ]
then 
exit $curlexit
fi
done
