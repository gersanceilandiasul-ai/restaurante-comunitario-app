// Service Worker mínimo do PWA "Restaurante Comunitário".
// Propósito único: cumprir o requisito técnico do Chrome/Android pra
// considerar o site "instalável" como app. Não cacheia o conteúdo do
// Web App (que depende de dados sempre atualizados da planilha).

const CACHE_NAME = "rest-comunitario-v1";

self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

// Estratégia "network-first": sempre tenta buscar da rede primeiro.
// Só usa algo em cache se a rede falhar (ex.: sem sinal por um instante),
// evitando telas em branco — mas sem prender o app numa versão antiga.
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});
