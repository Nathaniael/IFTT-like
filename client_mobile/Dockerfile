FROM cirrusci/flutter
# COPY RESSOURCES
COPY . /app
WORKDIR /app
USER root
RUN rm -f .packages
# BUILD THE APK RELEASE FILE
RUN flutter clean
RUN flutter pub cache repair
RUN flutter pub get
RUN flutter build apk