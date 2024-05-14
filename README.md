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

2.CREATE DOCKER IMAGES
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


3.TAG DOCKER IMAGES
    EXAMPLES
        docker tag 229096b25cfe18a4e4769b0ed6e2381e2e4f643c2095527f12d89e4940cafca6 xywings/ds-images-1:coursebackend

        docker tag 462c7e89406f5bbadbfe4daff6d1c6df258d4f2b1a8d2c2b34c41cb8316599a8 xywings/ds-images-1:enrolmentbackend

        docker tag 0f0c245cfe826c16cd8fe64698dbeceb46714b230bc9c1b3ba1d8226632410cc xywings/ds-images-1:paymentbackend

        docker tag 4fbedeaf27dcd155313e9745ebaa96f0435dc836b2a6674b8894202fba0a7e28 xywings/ds-images-1:userbackend

        docker tag 58c722e463ce9fc24d56df35b7a9429da91d972ff54a26d9f89810be4877ad64 xywings/ds-images-1:clientfrontend

4.PUSH TO DOCKER HUB
    docker push ImageName and Tag

4A. OR YOU CAN CLONE FROM THE HUB

    docker pull xywings/ds-images-1:clientfrontend
    docker pull xywings/ds-images-1:paymentbackend
    docker pull xywings/ds-images-1:userbackend
    docker pull xywings/ds-images-1:enrolmentbackend
    docker pull xywings/ds-images-1:coursebackend

5.CREATE KUBECTL DEPLOYMENT USING DEPLOYEMNT YAML'S
    kubectl apply -f clientdeployment.yaml
    kubectl apply -f coursedeployment.yaml
    kubectl apply -f enrolldeployment.yaml
    kubectl apply -f paymentdeployment.yaml
    kubectl apply -f userdeployment.yaml

6.CREATE KUBECTL SERVICE USING SERVICES YAML'S
    kubectl apply -f clientservice.yaml
    kubectl apply -f courseservice.yaml
    kubectl apply -f enrollservice.yaml
    kubectl apply -f paymentservice.yaml
    kubectl apply -f userservice.yaml

7. START MINIKUBE and TUNNEL
    minikube start
    minikube status
    minikube tunnel

8.ACCESS SERVICES USING MINIKUBE

    Checking 

        kubectl get deployment - get all the running or pending deployment
        kubectl get svc - get all the running or pending service

        if all the service are running then can access using below commands

    Accessing

        minikube service ds-images-client-service
        minikube service ds-images-course-service
        minikube service ds-images-user-service
        minikube service ds-images-payment-service
        minikube service ds-images-enrolment-service