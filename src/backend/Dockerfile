FROM python:3.11.2

RUN apt-get update && apt-get install -y libzbar0 libgl1-mesa-glx

WORKDIR /src

COPY requirements.txt /src

RUN pip install --no-cache-dir -r requirements.txt

COPY . /src

ENV PYTHONPATH=/src

ENTRYPOINT [ "gunicorn" ]

CMD ["--workers=8", "src.__main__:app", "--bind=0.0.0.0:80"]