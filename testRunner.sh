#!/bin/bash

#*********Script and Execution Details ******
ProductName="ins-ui"
ModuleName="test-files"
EnvironmentName="qa"
TestCaseName="All"
MailingList="ppagar@liquidx.com"

while getopts p:m:e:t:l: option
do
    case "${option}" in
        p) ProductName=${OPTARG};;
        m) ModuleName=${OPTARG};;
        e) EnvironmentName=${OPTARG};;
        t) TestCaseName=${OPTARG};; 
        l) MailingList=${OPTARG};;
    esac
done
 
echo "*****************************************************"
echo "Product to be used :- ${ProductName}"
echo "CollectionName to be used :- ${CollectionName}"
echo "ModuleName to be used :- ${ModuleName}"
echo "TestCaseName to be used :- ${TestCaseName}" 
echo "Mail to be sent to :- ${MailingList}" 
 
echo "******************************************************"

startTime=$(date)
echo "Execution Start : ${startTime}"
 

podName=${ProductName//_/-}

podName=${podName,,*}
prodName=${ProductName//_/-}

prodName=${prodName,,*}
R=$(($RANDOM%10))
PODNAME=$podName$R

echo $PODNAME

read -p "Press any key..."

kubectl get pods -n default --field-selector=status.phase==Succeeded -l prodname=${prodName}

kubectl delete pods -n default --field-selector=status.phase==Succeeded -l prodname=${prodName}

kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "liquidxdev-azurecr-io"}]}'

kubectl run $PODNAME --image=liquidxdev.azurecr.io/liquidxinc/qa-ui-ins-cy:latest --restart=Never --labels=prodname=${prodName} --image-pull-policy=Always --env="Product_Name=${ProductName}" --env="Module_Name=${ModuleName}" --env="Environment_Name=${EnvironmentName}" --env="TestCase_Name=${TestCaseName}" --env="Mailing_List=${MailingList}"
 
while [[ $(kubectl get pods $PODNAME -o 'jsonpath={..status.conditions[?(@.type=="Ready")].status}') != "True" ]]; do echo "$(kubectl get pods $PODNAME -o 'jsonpath={..status.conditions[?(@.type=="Ready")].status}')" && sleep 1; done

echo "Pod is up and running."

#kubectl get pods | grep "$PODNAME"

pod=$(kubectl get pod -o custom-columns=NAME:.metadata.name | grep "$PODNAME")

kubectl logs $PODNAME

echo "waiting for pod"

while [[ $(kubectl get pod $PODNAME --output="jsonpath={.status.phase}") != "Succeeded" ]]; do echo "waiting for pod to complete.." && sleep 10; done

kubectl logs $PODNAME
 
endTime=$(date)

echo "Execution Stop :- ${endTime}"

read -p "Press any key..."