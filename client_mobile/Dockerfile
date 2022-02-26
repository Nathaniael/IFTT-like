FROM cirrusci/flutter
# COPY RESSOURCES
COPY . /app
WORKDIR /app
USER root
# BUILD THE APK RELEASE FILE
RUN cd /app
RUN flutter pub get
RUN flutter clean
RUN flutter pub cache repair
RUN flutter build apk --release