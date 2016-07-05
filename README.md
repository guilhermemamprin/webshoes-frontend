#webshoes-frontend
To implement frontend, we are using Ubuntu 16.04 and OS x 10.11.4 El Capitan as operating system, and as programming language we are using AngularJs with typescript and jade.

#Install
•OS X
•Node and NPM
brew install node --without-npm
echo prefix=~/.npm-packages >> ~/.npmrc
curl -L https://www.npmjs.com/install.sh | sh
export PATH="$HOME/.node/bin:$PATH"

•Ubuntu
apt-get install nodejs

• typescript and dependencies 
npm install -g typescript
npm install
bower install

#Running
gulp serve