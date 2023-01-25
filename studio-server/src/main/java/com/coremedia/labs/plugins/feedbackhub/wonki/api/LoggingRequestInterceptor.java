package com.coremedia.labs.plugins.feedbackhub.wonki.api;

import edu.umd.cs.findbugs.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class LoggingRequestInterceptor implements ClientHttpRequestInterceptor {

  private static final Logger LOG = LoggerFactory.getLogger(LoggingRequestInterceptor.class);


  @Override
  @NonNull
  public ClientHttpResponse intercept(@NonNull HttpRequest request, @NonNull byte[] body, ClientHttpRequestExecution execution) throws IOException {
    traceRequest(request, body);
    ClientHttpResponse response = execution.execute(request, body);
    traceResponse(response);
    return response;
  }


  private static void traceRequest(HttpRequest request, byte[] body) {
    LOG.debug("\n===========================request begin================================================\n" +
                    "URI         : {}\n" +
                    "Method      : {}\n" +
                    "Headers     : {}\n" +
                    "Request body: {}\n" +
                    "==========================request end================================================",
            request.getURI(),
            request.getMethod(),
            request.getHeaders(),
            new String(body, StandardCharsets.UTF_8)
    );
  }

  private static void traceResponse(ClientHttpResponse response) throws IOException {
    if (response.getStatusCode().is5xxServerError()) {
      LOG.debug("=======================response begin===============================================\n" +
                      "Status code  : {}\n" +
                      "=======================response end=================================================",
              response.getStatusCode()
      );
    } else {
      StringBuilder inputStringBuilder = new StringBuilder();
      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(response.getBody(), StandardCharsets.UTF_8));
      String line = bufferedReader.readLine();
      while (line != null) {
        inputStringBuilder.append(line);
        inputStringBuilder.append('\n');
        line = bufferedReader.readLine();
      }
      LOG.debug("\n=======================response begin===============================================\n" +
                      "Status code  : {}\n" +
                      "Status text  : {}\n" +
                      "Headers      : {}\n" +
                      "Response body: {}\n" +
                      "=======================response end=================================================",
              response.getStatusCode(),
              response.getStatusText(),
              response.getHeaders(),
              inputStringBuilder.toString()
      );
    }
  }
}
