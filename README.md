# daj
COS420 Group project
## Quickstart:
Pull and run from [Docker Hub](https://hub.docker.com/r/devinchristianson/polychord):
`docker run -p 8000:80 devinchristianson/polychord:v.0.0.2`
## Develop
Pull down the repo:  
`git clone https://github.com/devinchristianson/daj.git`
### Local environment
#### Pre-requisites:
- Python 3.6+
- Flask    
#### Usage
Within the src folder, run the flask server:  
`cd src`  
`python server.py`
### Docker and VSCode environment
#### Pre-requisites:
- Docker
- Docker-compose
- VSCode with Remote container extension
#### Usage
Open the src folder in vscode:
`code src/`
When VSCode prompts if you want to reopen in a container, select "yes"
## Advanced Docker usage
In order to change the port that the server listens on, set the `PORT` environment variable. Note that for this reason, no port is exposed by default on the production Docker image, though the server listens on port 80 by default.
