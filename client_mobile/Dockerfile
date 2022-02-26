FROM cirrusci/flutter
COPY . /app
WORKDIR /app
USER root
RUN flutter pub get
RUN flutter clean
RUN flutter build apk
RUN mkdir /app/mobile_app/
RUN cp build/app/outputs/flutter-apk/app-release.apk /mobile_app/client.apk