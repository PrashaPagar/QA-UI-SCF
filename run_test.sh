#!/bin/bash 

#*********Script and Execution Details ******
ProductName="ins-ui"
EnvironmentName="qa" #Old pipeline
ModuleName="specs"  #In Old pipeline, it is module
TestCaseName="ngi-2747-pass-quote.spec0"
MailingList="ppagar@liquidx.com"
KubernetesNamespace="qa"
Tag="latest"
 
# Set PODNAME. This could be made into a switch for script reusability
R=$(($RANDOM%10))
IMAGE_NAME="qa-ui-ins-cy"
PODNAME="$IMAGE_NAME-${EnvironmentName/_/-}${R}"
PODNAME=${PODNAME,,}

LABELS="executionName=$IMAGE_NAME-${EnvironmentName/_/-}"

while getopts p:m:e:f:l:k:t: option
do
case "${option}"
in
p) ProductName=${OPTARG};;
m) ModuleName=${OPTARG};;
e) EnvironmentName=${OPTARG};;
f) TestCaseName=${OPTARG};; 
l) MailingList=${OPTARG};;
k) KubernetesNamespace=${OPTARG};;
t) Tag=${OPTARG};;
esac
done 

startTime=$(date)
echo "Execution Start : ${startTime}"

if kubectl get pods -n $KubernetesNamespace --field-selector=status.phase==Succeeded -l $LABELS > /dev/null 2>&1; then
    echo "Found previous executions. Cleaning up old pods"
    kubectl delete pods -n $KubernetesNamespace --field-selector=status.phase==Succeeded -l $LABELS
fi

# This is so that the script will gracefully exit if there's a problem creating the pod.
{
    echo "Creating pod $PODNAME with version $Tag"
    kubectl run "$PODNAME" -n $KubernetesNamespace --image=liquidxdev.azurecr.io/liquidxinc/$IMAGE_NAME:$Tag \
        --restart=Never \
        --labels=$LABELS \
        --image-pull-policy=Always \
        --serviceaccount=$IMAGE_NAME \
        --env="ProductName=${ProductName}" \
        --env="EnvironmentName=${EnvironmentName}" \
        --env="ModuleName=${ModuleName}" \
        --env="TestCaseName=${TestCaseName}"\
        --env="MailingList=${MailingList}"
} ||
{
    echo "Failed to create pod. See logs above for details. Exiting..."
    exit 1
}
WAITTIME=0
while [[ $(kubectl get pods $PODNAME -n $KubernetesNamespace -o 'jsonpath={..status.conditions[?(@.type=="Ready")].status}') != "True" ]]; do 
    if [ ! $? ]; then
        echo "Pod failure has been detected. Ending job"
        exit 1
    fi
    echo "Waiting for pod to be ready" && sleep 5
    WAITTIME=$(($WAITTIME + 5))
    if [ "$WAITTIME" -eq "600" ]; then
        echo "Job has timed out after 10 minutes. Please find the issue and try again later."
        exit 1
    fi
done

echo "Executing Test Run"
WAITTIME=0
while [[ $(kubectl get pod $PODNAME -n $KubernetesNamespace --output="jsonpath={.status.phase}") != "Succeeded" ]]; do
    if [ ! $? ]; then
        echo "Pod failure has been detected. Ending job"
        exit 1
    fi
    echo "Waiting for tests to complete..." && sleep 10
    WAITTIME=$(($WAITTIME + 10))
    if [ "$WAITTIME" -eq "1200" ]; then
        echo "Job has timed out after 10 minutes. Please find the issue and try again later."
        exit 1
    fi
done



echo "****************************************** EXECUTION LOGS ***********************************************"
echo " "
kubectl logs "$PODNAME" -n $KubernetesNamespace
echo " "
echo "*********************************************************************************************************" 
endTime=$(date)

echo "Execution Stop :- ${endTime}"

# This allows us to fail a pipeline if the test results failed
RESULT=$(kubectl logs "$PODNAME" -n $KubernetesNamespace | grep "resultStatus Pass")
if [ -z "$RESULT" ]; then  
    exit 1
else
    exit 0
fi