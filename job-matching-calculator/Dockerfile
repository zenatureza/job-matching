FROM python:latest

WORKDIR /code

ADD requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY get_best_candidates.py get_best_candidates.py

COPY app.py app.py

EXPOSE 5000

CMD ["python", "-u", "app.py"]