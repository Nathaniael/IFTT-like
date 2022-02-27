FROM cirrusci/flutter
COPY . /app
WORKDIR /app
USER root
RUN flutter clean
RUN flutter pub get
RUN flutter build apk