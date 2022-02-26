FROM cirrusci/flutter
# COPY RESSOURCES
COPY . /app
WORKDIR /app
USER root
# BUILD THE APK RELEASE FILE
RUN cd /app
RUN rm -rf build .packages
RUN flutter pub get
RUN flutter clean
RUN flutter build apk --release