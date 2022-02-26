FROM cirrusci/flutter
# COPY RESSOURCES
COPY . /app
WORKDIR /app
USER root
# BUILD THE APK RELEASE FILE
RUN cd /app
RUN flutter clean
RUN flutter pub get
RUN flutter build apk --release