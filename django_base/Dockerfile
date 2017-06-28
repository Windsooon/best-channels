FROM python
ENV PYTHONUNBUFFERED 1
ADD sources.list /etc/apt/sources.list
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/
ADD requirements.txt /usr/src/app/
RUN pip3 install -r requirements.txt -i https://pypi.doubanio.com/simple/
