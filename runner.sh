#!/bin/bash
export timestamp=$(date +%Y-%m-%d_%H-%M-%S)
export execDate=$(date +%Y-%m-%d)

export env=${EnvironmentName}
export product=${ProductName}
export module=${ModuleName}
export testcase=${TestCaseName}
export MailingList=${MailingList}

echo "TestCaseName: "${TestCaseName}
shopt -s nocasematch
if [ ${TestCaseName} == "All" ]; then
   test="*"
else
   test=${TestCaseName}".spec.js"
fi

echo $test
 
#Execute cypress test
 ./node_modules/.bin/cypress run --spec "cypress/integration/${ModuleName}/${test}" --browser chrome
 if [ $? = 0 ]; then
    status='Pass'  
else
    status='Fail'
fi
echo "Test status: ${status}"

#Merge Test reports
npx mochawesome-merge -f /e2e/cypress/reports/.jsons/*json -o /e2e/cypress/reports/result.json
marge -o /e2e/cypress/FinalReport -f ${TestCaseName} --overwrite false --saveHtml /e2e/cypress/reports/result.json

#Post report to blob
node publish-report-spec.js
#Send report link in email
report_url="https://lqxqaartifacts.blob.core.windows.net/ui-automation/${ProductName}/${execDate}/${ModuleName}_${timestamp}/${TestCaseName}.html"
node send-email.js $report_url $status $ProductName $ModuleName $MailingList

#Set url and date in config fie
#sed -i """/report_url/c\   \"report_url\" : \"${report_url}\",""" cypress/fixtures/reporting.json
#sed -i """/create_date/c\   \"create_date\" : \"${timestamp}\",""" cypress/fixtures/reporting.json

#Save report stats into DB
# ./node_modules/.bin/cypress run --spec "cypress/integration/common/reportStats.spec.js"
# cd /e2e/helper && node xmlParser.js
#read -p "Press any key...."

 