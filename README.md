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











SIDE LOG NOTE




Microsoft Windows [Version 10.0.19045.4355]
(c) Microsoft Corporation. All rights reserved.

C:\Users\XYWINGS\Documents\LP\learning-platform\backend>cd course-backend

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\course-backend>docker build -t course-backend .
[+] Building 0.0s (0/0)  docker:default
2024/05/14 17:35:22 http2: server: error reading preface from client //./pipe/docker_engine: file has already been close[+] Building 118.6s (12/12) FINISHED                                                                     docker:default
 => [internal] load build definition from Dockerfile                                                               0.9s
 => => transferring dockerfile: 560B                                                                               0.0s
 => [internal] load metadata for docker.io/library/node:lts-alpine                                                 3.1s
 => [auth] library/node:pull token for registry-1.docker.io                                                        0.0s
 => [internal] load .dockerignore                                                                                  0.9s
 => => transferring context: 2B                                                                                    0.0s
 => CACHED [1/6] FROM docker.io/library/node:lts-alpine@sha256:291e84d956f1aff38454bbd3da38941461ad569a185c20aa28  0.0s
 => [internal] load build context                                                                                  2.3s
 => => transferring context: 604.65kB                                                                              0.0s
 => [2/6] WORKDIR /Users/XYWINGS/Documents/LP/learning-platform/backend/course-backend                             2.9s
 => [3/6] COPY package.json yarn.lock ./                                                                           2.0s
 => [4/6] RUN yarn install                                                                                        78.9s
 => [5/6] COPY . .                                                                                                 4.9s
 => [6/6] RUN yarn compile                                                                                        12.5s
 => exporting to image                                                                                             9.2s
 => => exporting layers                                                                                            8.4s
 => => writing image sha256:7df5119ecde980ddb9ae23dac5729a026502fab6939aab34dca3406a3dffe04b                       0.1s
 => => naming to docker.io/library/course-backend                                                                  0.2s

View build details: docker-desktop://dashboard/build/default/default/1nawdorgw0oxk4kmuit1x41iz

What's Next?
  View a summary of image vulnerabilities and recommendations → docker scout quickview

[+] Building 94.4s (11/11) FINISHED                                                                      docker:default
 => [internal] load build definition from Dockerfile                                                               1.0s
 => => transferring dockerfile: 564B                                                                               0.0s
 => [internal] load metadata for docker.io/library/node:lts-alpine                                                 1.7s
 => [internal] load .dockerignore                                                                                  0.9s
 => => transferring context: 2B                                                                                    0.0s
 => CACHED [1/6] FROM docker.io/library/node:lts-alpine@sha256:291e84d956f1aff38454bbd3da38941461ad569a185c20aa28  0.0s
 => [internal] load build context                                                                                  1.8s
 => => transferring context: 605.14kB                                                                              0.0s
 => [2/6] WORKDIR /Users/XYWINGS/Documents/LP/learning-platform/backend/enrolement-backend                         2.2s
 => [3/6] COPY package.json yarn.lock ./                                                                           2.1s
 => [4/6] RUN yarn install                                                                                        64.7s
 => [5/6] COPY . .                                                                                                 3.6s
 => [6/6] RUN yarn compile                                                                                         6.6s
 => exporting to image                                                                                             8.4s
 => => exporting layers                                                                                            7.7s
 => => writing image sha256:c293166e3cad474808702828b88fd3fda11de9033e0e2d519698e30220d5775b                       0.1s
 => => naming to docker.io/library/enrollment-backend                                                              0.2s

View build details: docker-desktop://dashboard/build/default/default/n56q9ht38kcabtktn8suoiivs

What's Next?
  View a summary of image vulnerabilities and recommendations → docker scout quickview

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\enrolement-backend>cd ..

C:\Users\XYWINGS\Documents\LP\learning-platform\backend>cd payment-backend

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\payment-backend>docker build -t payment-backend .
[+] Building 117.6s (12/12) FINISHED                                                                     docker:default
 => [internal] load build definition from Dockerfile                                                               1.2s
 => => transferring dockerfile: 515B                                                                               0.0s
 => [internal] load metadata for docker.io/library/node:lts-alpine                                                 2.2s
 => [auth] library/node:pull token for registry-1.docker.io                                                        0.0s
 => [internal] load .dockerignore                                                                                  0.8s
 => => transferring context: 2B                                                                                    0.0s
 => [internal] load build context                                                                                  2.4s
 => => transferring context: 604.55kB                                                                              0.0s
 => CACHED [1/6] FROM docker.io/library/node:lts-alpine@sha256:291e84d956f1aff38454bbd3da38941461ad569a185c20aa28  0.0s
 => [2/6] WORKDIR /Users/XYWINGS/Documents/LP/learning-platform/backend/payment-backend                            2.7s
 => [3/6] COPY package.json yarn.lock ./                                                                           2.0s
 => [4/6] RUN yarn install                                                                                        87.9s
 => [5/6] COPY . .                                                                                                 2.1s
 => [6/6] RUN yarn compile                                                                                         6.7s
 => exporting to image                                                                                             9.1s
 => => exporting layers                                                                                            8.4s
 => => writing image sha256:750d614df3b99ea78e249105c58106cab1ed707cebfd10a37ff1435e2510cc05                       0.1s
 => => naming to docker.io/library/payment-backend                                                                 0.2s

View build details: docker-desktop://dashboard/build/default/default/qdtet3nfztzzpyi84w2hh6nhw

What's Next?
  View a summary of image vulnerabilities and recommendations → docker scout quickview

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\payment-backend>cd ..

C:\Users\XYWINGS\Documents\LP\learning-platform\backend>cd user-backend

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\user-backend>docker build -t user-backend .
[+] Building 99.9s (11/11) FINISHED                                                                      docker:default
 => [internal] load build definition from Dockerfile                                                               0.9s
 => => transferring dockerfile: 515B                                                                               0.0s
 => [internal] load metadata for docker.io/library/node:lts-alpine                                                 1.4s
 => [internal] load .dockerignore                                                                                  0.8s
 => => transferring context: 2B                                                                                    0.0s
 => [1/6] FROM docker.io/library/node:lts-alpine@sha256:291e84d956f1aff38454bbd3da38941461ad569a185c20aa289f71f37  0.0s
 => [internal] load build context                                                                                  1.2s
 => => transferring context: 508.34kB                                                                              0.0s
 => CACHED [2/6] WORKDIR /Users/XYWINGS/Documents/LP/learning-platform/backend/payment-backend                     0.0s
 => [3/6] COPY package.json yarn.lock ./                                                                           9.6s
 => [4/6] RUN yarn install                                                                                        65.6s
 => [5/6] COPY . .                                                                                                 3.1s
 => [6/6] RUN yarn compile                                                                                         6.7s
 => exporting to image                                                                                             7.4s
 => => exporting layers                                                                                            6.7s
 => => writing image sha256:7732e451a8e4a9071f3a71e0a9b64588c9bdbfa0d820d4a20e078c87f8881d52                       0.1s
 => => naming to docker.io/library/user-backend                                                                    0.2s

View build details: docker-desktop://dashboard/build/default/default/zqh56mu5zb000xfkw7bnjsitx

What's Next?
  View a summary of image vulnerabilities and recommendations → docker scout quickview

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\user-backend>cd..

C:\Users\XYWINGS\Documents\LP\learning-platform\backend>cd..

C:\Users\XYWINGS\Documents\LP\learning-platform> docker tag 7df5119ecde980ddb9ae23dac5729a026502fab6939aab34dca3406a3dffe04b xywings/ds-images-1:course-backend

C:\Users\XYWINGS\Documents\LP\learning-platform>docker tag c293166e3cad474808702828b88fd3fda11de9033e0e2d519698e30220d5775b xywings/ds-images-1:enrollment-backend

C:\Users\XYWINGS\Documents\LP\learning-platform> docker tag 750d614df3b99ea78e249105c58106cab1ed707cebfd10a37ff1435e2510cc05 xywings/ds-images-1:payment-backend

C:\Users\XYWINGS\Documents\LP\learning-platform>docker tag 7732e451a8e4a9071f3a71e0a9b64588c9bdbfa0d820d4a20e078c87f8881d52 xywings/ds-images-1:user-backend

C:\Users\XYWINGS\Documents\LP\learning-platform>docker tag 67894edf3a8e12a88ae7af7628cc6603b7fb1dd0135afe62e5fbde48df92f8e1 xywings/ds-images-1:client

C:\Users\XYWINGS\Documents\LP\learning-platform>cd client

C:\Users\XYWINGS\Documents\LP\learning-platform\client>minikube start
W0514 18:06:59.487889    3464 main.go:291] Unable to resolve the current Docker CLI context "default": context "default": context not found: open C:\Users\XYWINGS\.docker\contexts\meta\37a8eec1ce19687d132fe29051dca629d164e2c4958ba141d5f4133a33f0688f\meta.json: The system cannot find the path specified.
* minikube v1.33.0 on Microsoft Windows 10 Education N 10.0.19045.4355 Build 19045.4355
* Automatically selected the docker driver
* Using Docker Desktop driver with root privileges
* Starting "minikube" primary control-plane node in "minikube" cluster
* Pulling base image v0.0.43 ...
* Creating docker container (CPUs=2, Memory=4000MB) ...
* Preparing Kubernetes v1.30.0 on Docker 26.0.1 ...
  - Generating certificates and keys ...
  - Booting up control plane ...
  - Configuring RBAC rules ...
* Configuring bridge CNI (Container Networking Interface) ...
* Verifying Kubernetes components...
  - Using image gcr.io/k8s-minikube/storage-provisioner:v5
* Enabled addons: storage-provisioner, default-storageclass
* Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\user-backend>
C:\Users\XYWINGS\Documents\LP\learning-platform\backend\user-backend>kubectl apply -f userdeployment.yaml
deployment.apps/ds-images-user-deployment configured
service/ds-images-user-service unchanged

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\user-backend>cd..

C:\Users\XYWINGS\Documents\LP\learning-platform\backend>cd payment-backend

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\payment-backend>kubectl apply -f paymentdeployment.yaml
deployment.apps/ds-images-payment-deployment configured
service/ds-images-payment-service unchanged

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\payment-backend>cd..

C:\Users\XYWINGS\Documents\LP\learning-platform\backend>cd enrolement-backend

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\enrolement-backend> kubectl apply -f enrolldeployment.yaml
deployment.apps/ds-images-enrolment-deployment configured
service/ds-images-enrolment-service unchanged

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\enrolement-backend>cd..

C:\Users\XYWINGS\Documents\LP\learning-platform\backend>cd course-backend

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\course-backend>kubectl apply -f courseservice.yaml
error: the path "courseservice.yaml" does not exist

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\course-backend>kubectl apply -f coursedeployment.yaml
deployment.apps/ds-images-course-deployment configured
service/ds-images-course-service unchanged

C:\Users\XYWINGS\Documents\LP\learning-platform\backend\course-backend>cd..

C:\Users\XYWINGS\Documents\LP\learning-platform\backend>cd..

C:\Users\XYWINGS\Documents\LP\learning-platform>cdclient
'cdclient' is not recognized as an internal or external command,
operable program or batch file.

C:\Users\XYWINGS\Documents\LP\learning-platform>cd client

C:\Users\XYWINGS\Documents\LP\learning-platform\client>kubectl apply -f clientdeployment.yaml
deployment.apps/ds-images-client-deployment configured
service/ds-images-client-service unchanged


C:\Users\XYWINGS\Documents\LP\learning-platform\client>kubectl get deployments
NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
ds-images-client-deployment      1/1     1            1           25m
ds-images-course-deployment      1/1     1            1           23m
ds-images-enrolment-deployment   1/1     1            1           23m
ds-images-payment-deployment     1/1     1            1           23m
ds-images-user-deployment        1/1     1            1           22m

C:\Users\XYWINGS\Documents\LP\learning-platform\client>kubectl get pods
NAME                                              READY   STATUS    RESTARTS   AGE
ds-images-client-deployment-5cfbc84c7c-cvrq7      1/1     Running   0          6m35s
ds-images-course-deployment-7c78c8b54d-jtn49      1/1     Running   0          6m57s
ds-images-enrolment-deployment-765486fdd8-964x2   1/1     Running   0          10m
ds-images-payment-deployment-5b4c95fb7f-cq5p2     1/1     Running   0          12m
ds-images-user-deployment-854b6455cc-sddcf        1/1     Running   0          12m

C:\Users\XYWINGS\Documents\LP\learning-platform\client>minikube tunnel
W0514 18:38:05.644196   19172 main.go:291] Unable to resolve the current Docker CLI context "default": context "default": context not found: open C:\Users\XYWINGS\.docker\contexts\meta\37a8eec1ce19687d132fe29051dca629d164e2c4958ba141d5f4133a33f0688f\meta.json: The system cannot find the path specified.
* Tunnel successfully started

* NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible ...

* Starting tunnel for service ds-images-course-service.
* Starting tunnel for service ds-images-enrolment-service.
* Starting tunnel for service ds-images-payment-service.
* Starting tunnel for service ds-images-user-service.






