# -------------------------🔖 FRONTEND-------------------------
frontend.app.build_prod:
	cd frontend && npm install && npm run build



# -------------------------🗂️ BACKEND-------------------------

backend.multi_platform.build_prod:
	docker buildx build --platform linux/amd64,linux/arm64 \
	-t hamilgdev/models-prod:latest \
	-f backend/Dockerfile ./backend \
	--push

backend.multi_platform.pull_prod:
	docker pull --platform linux/amd64 hamilgdev/models-prod:latest

backend.ecr.prepare_build_prod:
	docker tag hamilgdev/models-prod:latest 261252373938.dkr.ecr.us-east-1.amazonaws.com/ml-models:latest

backend.ecr.push_prod:
	docker push 261252373938.dkr.ecr.us-east-1.amazonaws.com/ml-models:latest


# -------------------------🕋 KINESIS-------------------------

kinesis.multi_platform.build_prod:
	docker buildx build --platform linux/amd64,linux/arm64 \
	-t hamilgdev/kinesisagent-prod:latest \
	-f kinesis/Dockerfile ./kinesis \
	--push

kinesis.multi_platform.pull_prod:
	docker pull --platform linux/amd64 hamilgdev/kinesisagent-prod:latest

kinesis.ecr.prepare_build_prod:
	docker tag hamilgdev/kinesisagent-prod:latest 261252373938.dkr.ecr.us-east-1.amazonaws.com/kinesisagent

kinesis.ecr.push_prod:
	docker push 261252373938.dkr.ecr.us-east-1.amazonaws.com/kinesisagent