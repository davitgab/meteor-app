# Makefile
# Replace <app-name> with your app's name
# Replace <server-ip> with your server's IP address
# Replace <image-name> with custom docker tag.
# (<username>/<appname>) format
# Replace <container-name> with a custom name.
APP_NAME:=test-repo
TARGET_DIRECTORY:=/workspace2/meteor-intro/new-meteor-react-admin
SERVER_IP:=127.0.0.1
IMAGE_NAME:=test-app
CONTAINER_NAME:=testappcontainer
TARBALL_NAME:=test-app.tar.gz
URL:=localhost
PORT:=3000
.PHONY: build
build:
	@echo "-------------------------------------------------------"
	@echo "Creates a tarball under ./deploy"
	@echo "-------------------------------------------------------"
	@echo "Building..."
	# Remove previous build
	@rm -rf ./bundle ./deploy/$(TARBALL_NAME)
	@meteor build . --server="$(URL)" --directory
	@cp ./deploy/Dockerfile ./deploy/docker-compose.yml ./bundle
	@tar -zcf ./$(TARBALL_NAME) ./bundle
	@mv ./$(TARBALL_NAME) ./deploy
	@rm -rf ./bundle
	@echo "Builded successfully!"
	@echo "(the build output tarball is ./deploy/bundle.tar.gz)".
.PHONY: deploy
deploy:
	@echo "-------------------------------------------------------"
	@echo "Uploading and running app in a docker container"
	@echo "-------------------------------------------------------"
	@ssh davit_gab@$(SERVER_IP) \
		"cat > $(TARGET_DIRECTORY)/$(TARBALL_NAME) ; \
		cd $(TARGET_DIRECTORY) ; \
		tar -xzf ./$(TARBALL_NAME) ; \
		cd ./bundle ; \
		ls ; \
		docker stop $(CONTAINER_NAME) ; \
		docker rm $(CONTAINER_NAME) ; \
		docker-compose up; \
		" \
	< ./deploy/$(TARBALL_NAME)

# docker-compose up; \
# docker build -t test-app:new . && \
docker run -it -p $(PORT):80 -d --network=host test-app:new ; \