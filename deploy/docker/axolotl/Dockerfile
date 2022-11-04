FROM public.ecr.aws/lambda/nodejs:16

#install the dependencies
RUN yum -y update \
  && yum -y groupinstall "Development Tools" \
  && yum install -y  gcc-c++ && yum -y install findutils tar gzip gcc-c++ cairo-devel \
	libjpeg-turbo-devel pango-devel giflib-devel \ 
	zlib-devel librsvg2-devel

RUN npm i canvas

COPY index.mjs ./

ENV LD_PRELOAD=/var/task/node_modules/canvas/build/Release/libz.so.1

RUN yum remove -y cairo-devel libjpeg-turbo-devel \
		pango-devel giflib-devel zlib-devel librsvg2-devel
