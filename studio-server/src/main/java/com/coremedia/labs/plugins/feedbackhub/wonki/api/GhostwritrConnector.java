package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import com.coremedia.labs.plugins.feedbackhub.wonki.GhostwritrSettings;
import com.google.gson.Gson;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Optional;

import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.ACCEPT_CHARSET;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.POST;

/**
 *
 */
public class GhostwritrConnector {
  private static final Logger LOG = LoggerFactory.getLogger(GhostwritrConnector.class);
  private static final String BASE_URL = "https://gate.wonki.tech/ghostwritr/";
  private static final String API_VERSION = "v3";
  public static final String API_SUBSCRIPTION_KEY = "Ocp-Apim-Subscription-Key";
  private final RestTemplate restTemplate;

  public GhostwritrConnector(@Qualifier("ghostwritrRestTemplate") RestTemplate ghostwritrRestTemplate) {
    this.restTemplate = ghostwritrRestTemplate;
  }

  @NonNull
  public <T, V> Optional<T> postResource(@NonNull GhostwritrSettings settings, @NonNull String path, @Nullable V requestBodyEntity, @NonNull Class<T> responseType) {
    HttpEntity<String> httpEntity = buildRequestEntity(settings, requestBodyEntity);
    return performRequest(POST, path, httpEntity, responseType);
  }

  @NonNull
  private <T> Optional<T> performRequest(@NonNull HttpMethod httpMethod, @NonNull String path, @NonNull HttpEntity<String> requestEntity, @NonNull Class<T> responseType) {
    Optional<ResponseEntity<String>> responseEntityOptional = makeExchange(httpMethod, requestEntity, path);
    if (responseEntityOptional.isEmpty()) {
      return Optional.empty();
    }
    ResponseEntity<String> responseEntity = responseEntityOptional.get();
    Gson gson = new Gson();
    return Optional.ofNullable(gson.fromJson(responseEntity.getBody(), responseType));
  }

  @NonNull
  private static <T> HttpEntity<String> buildRequestEntity(@NonNull GhostwritrSettings settings, @Nullable T requestBodyEntity) {
    Gson gson = new Gson();
    String payload = gson.toJson(requestBodyEntity);
    return new HttpEntity<>(payload.replaceAll("\n", " "), buildHttpHeaders(settings));
  }

  @NonNull
  private static HttpHeaders buildHttpHeaders(@NonNull GhostwritrSettings settings) {
    HttpHeaders headers = new HttpHeaders();
    headers.set(CONTENT_TYPE, "application/json");
    headers.set(ACCEPT, "application/json");
    headers.set(ACCEPT_CHARSET, "utf-8");
    headers.set(API_SUBSCRIPTION_KEY, settings.getApiKey());
    return headers;
  }

  @NonNull
  private Optional<ResponseEntity<String>> makeExchange(@NonNull HttpMethod httpMethod, @NonNull HttpEntity<String> requestEntity, @NonNull String path) {
    URI url = URI.create(BASE_URL + API_VERSION + path);
    ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod, requestEntity, String.class);
    return Optional.of(responseEntity);
  }
}
