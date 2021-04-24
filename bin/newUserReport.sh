#!/bin/sh

echo "Starting job $0 at `date`"
cd  /home/web-chem123/HappyCows
/usr/bin/node bin/newUserReport.js
echo "Job $0 Complete at `date`"

