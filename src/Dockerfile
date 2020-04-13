FROM python:3.7-alpine
COPY requirements.txt /
RUN pip install -r /requirements.txt
RUN pip install gunicorn
COPY static/ /app/static
COPY *.py /app
WORKDIR /app
CMD ["gunicorn", "-w 4", "--bind=0.0.0.0:80","server:app"]