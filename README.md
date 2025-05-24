# SE3020 Distributed Systems - Assignment
## Online Learning Platform
### Group ID : S2-SE-WE-26
#### Members
- IT21281464 Wijethunga I. A.
- IT21294952 Aluthge I. N.
- IT21276446 Wegodapola A. R.
- IT21209352 Bandara D. M. K. C. 

# learning-platform

HOW TO DEPLOY USING DOCKER AND KUBERNATES

1.INSTALL ALL THE SOFTWARE
    DOCKER,KUBERNATE,MINIKUBE,KUBECTL,NODEJS AND ALL THE OTHERS

2A1.CREATE DOCKER IMAGES
    EXAMPLES
    CHANGE YOUR WORKDIR ACCORDINGLY
        client
        #WORKDIR /Users/imandialuthge/Desktop/SLIIT/Year 03/Semester 2/DS/Assignment/learning-platform/client
        docker build cmnd - docker build -t client .
        PORT - 3000

        course backend
        WORKDIR /Users/XYWINGS/Documents/LP/learning-platform/backend/course-backend
        docker build cmnd - docker build -t course-backend .
        PORT - 8090

        enrollment backend
        WORKDIR /Users/XYWINGS/Documents/LP/learning-platform/backend/enrolment-backend
        docker build cmnd - docker build -t enrollment-backend .
        PORT - 8071

        payment backend
        WORKDIR /Users/XYWINGS/Documents/LP/learning-platform/backend/payment-backend
        docker build cmnd - docker build -t payment-backend .
        PORT - 8070

        user backend
        WORKDIR /Users/XYWINGS/Documents/LP/learning-platform/backend/user-backend
        docker build cmnd - docker build -t user-backend .
        PORT - 8080


2A2.TAG DOCKER IMAGES
    EXAMPLES
        docker tag 7df5119ecde980ddb9ae23dac5729a026502fab6939aab34dca3406a3dffe04b xywings/ds-images-1:course-backend

        docker tag c293166e3cad474808702828b88fd3fda11de9033e0e2d519698e30220d5775b xywings/ds-images-1:enrollment-backend

        docker tag 750d614df3b99ea78e249105c58106cab1ed707cebfd10a37ff1435e2510cc05 xywings/ds-images-1:payment-backend

        docker tag 7732e451a8e4a9071f3a71e0a9b64588c9bdbfa0d820d4a20e078c87f8881d52 xywings/ds-images-1:user-backend

        docker tag 8ee04174547c3c4717ece5f71aa61c77bf88871d083b70c2882725f432963413 client:latest




      docker tag 3f25f316fac566036c7733e5e719fc540a600543c2c112cf36d1381f47d1f57c achinthadavidson/ds-images-1:course-backend

        docker tag c293166e3cad474808702828b88fd3fda11de9033e0e2d519698e30220d5775b achinthadavidson/ds-images-1:enrollment-backend

        docker tag 750d614df3b99ea78e249105c58106cab1ed707cebfd10a37ff1435e2510cc05 achinthadavidson/ds-images-1:payment-backend

        docker tag 7732e451a8e4a9071f3a71e0a9b64588c9bdbfa0d820d4a20e078c87f8881d52 achinthadavidson/ds-images-1:user-backend

        docker tag 98369532d090b34422586f5fdc22f9d79bcbf60db764edb51365e80dddc47211 achinthadavidson/ds-images-1:client


2A3.PUSH TO DOCKER HUB
    docker push ImageName and Tag

2B. OR YOU CAN CLONE FROM THE HUB
    https://hub.docker.com/repository/docker/xywings/ds-images-1/general

    docker pull xywings/ds-images-1:client
    docker pull xywings/ds-images-1:payment-backend
    docker pull xywings/ds-images-1:user-backend
    docker pull xywings/ds-images-1:enrollment-backend
    docker pull xywings/ds-images-1:course-backend

3.START THE MINIKUBE
    minikube start
    minikube status

4.CREATE KUBECTL DEPLOYMENT USING DEPLOYEMNT YAML'S
    kubectl apply -f clientdeployment.yaml
    kubectl apply -f coursedeployment.yaml
    kubectl apply -f enrolldeployment.yaml
    kubectl apply -f paymentdeployment.yaml
    kubectl apply -f userdeployment.yaml

CREATE KUBECTL SERVICE USING SERVICES YAML'S
//NO NEED, FOR REFERENCE ONLY, MERGED SERVICE AND DEPLOYMENT
    kubectl apply -f clientservice.yaml
    kubectl apply -f courseservice.yaml
    kubectl apply -f enrollservice.yaml
    kubectl apply -f paymentservice.yaml
    kubectl apply -f userservice.yaml

5.Checking 
        kubectl get deployment - get all the running or pending deployment
        kubectl get svc - get all the running or pending service
        kubectl get pods - all the pods status must be ok
        if all the service are running then can access using below commands

6. START MINIKUBE and TUNNEL
    minikube tunnel
    start port forward if needed

7.ACCESS SERVICES USING MINIKUBE
    Accessing
        minikube service ds-images-client-service
        minikube service ds-images-course-service
        minikube service ds-images-user-service
        minikube service ds-images-payment-service
        minikube service ds-images-enrolment-service
