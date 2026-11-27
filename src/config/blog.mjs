/** Editorial contract: one publication decision, persisted before Astro builds. */
import { readFile, readdir, mkdir, writeFile, rename, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { parse } from 'yaml';
import {maintenanceOverlay,verifyMaintenanceApproval,insertMaintenanceFigure,validateMaintenanceHtml,maintenanceId,maintenanceHashes,maintenancePath} from './blog-maintenance.mjs';
export const BLOG_ORIGIN = 'https://tornostudio.com';
export const BLOG_STATES = ['draft','review','approved','published','hold_cannibalization','retired','no_go'];
export const blogIndexPath = locale => locale === 'en' ? '/en/blog/' : '/blog/';
const reserved = new Set(['recovery-commercial','lovable-production-commercial','rls-multitenant-howto']);
const blockedSlugs = new Set(['quanto-custa-sistema-sob-medida','prototipo-para-producao']);
const RELEASE_ALLOWLIST = [
  {"content_id": "torno-artigo-pt-20261106-sistema-multilingue", "intent_id": "buyer-multilingual-system-localization-acceptance-pt", "locale": "pt-BR", "path": "/blog/sistema-multilingue-requisitos-aceite/", "canonical_url": "https://tornostudio.com/blog/sistema-multilingue-requisitos-aceite/", "digest": "025c0d2fa9f1f56f7f6de60e1ac9dbe5009bc33d788b708bc2db210216351002", "digestScope": "file", "assets": [{"path": "torno-sistema-multilingue-percurso.svg", "digest": "8e9a4f6d8bbfd571082e81519fcb8d21ac2e44aaffdd9f4d9409174702fdb10e"}]},
  {"content_id": "torno-artigo-pt-20261109-acoes-lote", "intent_id": "buyer-bulk-action-partial-failure-acceptance-pt", "locale": "pt-BR", "path": "/blog/acoes-lote-sistema-falhas-parciais/", "canonical_url": "https://tornostudio.com/blog/acoes-lote-sistema-falhas-parciais/", "digest": "f33463418171dc486e0cc02c641bfbe8ba7af49a716af34964ab01fbc59316e9", "digestScope": "file", "assets": [{"path": "torno-lote-resultados.svg", "digest": "82fe94f1d60da6ef3de3eab4111e93af43c64e288cd263093f8be242436ad390"}, {"path": "torno-lote-retomada.svg", "digest": "4474a8456c7e7610e0351369a589219d5dd745fe901b97b0345618f66902b009"}]},
  {
    content_id: 'torno-artigo-pt-20261014-planilhas', intent_id: 'spreadsheet-to-system-pt', locale: 'pt-BR',
    path: '/blog/quando-automatizar-processos-planilhas/', canonical_url: `${BLOG_ORIGIN}/blog/quando-automatizar-processos-planilhas/`,
    digest: 'a84d4826d4b1d68efc03767aea2c09dd2ba8386a7b1ddaee87f235cc15974d66', digestScope: 'file',
  },
  {
    content_id: 'torno-artigo-pt-20261015-criterios-aceite-mvp', intent_id: 'software-vendor-choice-pt', locale: 'pt-BR',
    path: '/blog/criterios-aceite-mvp/', canonical_url: `${BLOG_ORIGIN}/blog/criterios-aceite-mvp/`,
    digest: 'bfee8c6b195d2ee2b3946327aa0e010348921bde6edc64c29169ab00e5d151e2', digestScope: 'body',
    asset: { path: 'torno.svg', digest: '77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582' },
  },
  {
    content_id: 'torno-artigo-pt-20261015-integracao-erp-briefing', intent_id: 'erp-integration-prequote-brief-pt', locale: 'pt-BR',
    path: '/blog/integracao-erp-briefing-orcamento/', canonical_url: `${BLOG_ORIGIN}/blog/integracao-erp-briefing-orcamento/`,
    digest: '133f80ab8567ba74e30f4a178000ec0414b8a2771b182e052ef85d991deaf235', digestScope: 'body',
    assets: [
      { path: 'integracao-erp-fluxo.svg', digest: 'cf0aa5fe6c9d404e0e52692adc3ae6da37fd6f6771395f5b93acf70cee55ba3c' },
      { path: 'integracao-erp-pendencias.svg', digest: '47e42d7a89d4ec7185a22883894901ba97aaa8a9b8ea871779de3ab910734785' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias', intent_id: 'existing-system-rebuild-evidence-pt', locale: 'pt-BR',
    path: '/blog/antes-de-refazer-sistema-evidencias/', canonical_url: `${BLOG_ORIGIN}/blog/antes-de-refazer-sistema-evidencias/`,
    digest: '3b64339e8b72d2d8b3359b3275c568e5d6924261bd09de3cec630e705a93d79d', digestScope: 'body',
    assets: [
      { path: 'evidencias-decisao.svg', digest: '07c35b5fa17ec1c9e19705050c19553469529a08b6039efe5d4d9e24d357c67b' },
      { path: 'exemplo-aprovacao.svg', digest: '6b2e9d913c417974600f2550a3bedb623aa827d5e3668424844a02e6a228607b' },
    ],
  },
  {content_id:maintenanceId,intent_id:'postlaunch-software-operating-cost-pt',locale:'pt-BR',path:maintenancePath,canonical_url:BLOG_ORIGIN+maintenancePath,digest:maintenanceHashes.body,digestScope:'file',assets:[{path:'orcamento-apos-lancamento.svg',digest:maintenanceHashes.svg}]},
  {
    content_id: 'torno-artigo-pt-20261016-migracao-dados-validacao', intent_id: 'data-migration-business-validation-pt', locale: 'pt-BR',
    path: '/blog/migracao-dados-validacao-troca-sistema/', canonical_url: `${BLOG_ORIGIN}/blog/migracao-dados-validacao-troca-sistema/`,
    digest: '7558a4d1482fb7dfbf8cfccc495efa997de243f8d82d8f5ac182c6489710a86d', digestScope: 'file',
    assets: [
      { path: 'migracao-validacao.svg', digest: 'bcdc6a98a684b4cf149ca19fa933508c94f9e3455ffc09dc1578b55e320fee97' },
      { path: 'migracao-corte.svg', digest: 'eb3c29b70e8bce51a62b79fad2bba12dfa9fdf97ea229e809d5b6db99c695513' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261019-passagem-tecnica-fornecedor', intent_id: 'software-vendor-technical-handover-pt', locale: 'pt-BR',
    path: '/blog/troca-fornecedor-software-passagem-tecnica/', canonical_url: `${BLOG_ORIGIN}/blog/troca-fornecedor-software-passagem-tecnica/`,
    digest: '26e905dd66382c942f9f7a6ac4aa7295e5e4a2a25444eff92683eebf3126ff27', digestScope: 'file',
    assets: [
      { path: 'torno-inventario-passagem.svg', digest: '1dc68c171f143efecce997167a12e130640b60475599be227f3a482ead23d7f7' },
      { path: 'torno-transferencia-verificacao.svg', digest: '848ad3bf6aed68333cf6121825c9860b9de88d213af65082c07e355db2009da0' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261019-erro-intermitente-evidencias', intent_id: 'intermittent-software-error-report-evidence-pt', locale: 'pt-BR',
    path: '/blog/erro-intermitente-software-evidencias/', canonical_url: `${BLOG_ORIGIN}/blog/erro-intermitente-software-evidencias/`,
    digest: '8c2fd8158c8ebf143cc081e1fc1230c16c182fbf41db6aae4e2a8d256feff6a8', digestScope: 'file',
    assets: [
      { path: 'torno-ficha-erro-intermitente.svg', digest: 'bd0c935014d8bdb09538dae92b69f6b0799996404e6e1c9e6cae2b4a71ebe351' },
      { path: 'torno-fluxo-erro-intermitente.svg', digest: '8c8345c8eb14913042fedff85fe30820647597cbb73fa1fa7a38e2c278c7aa78' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261019-priorizar-mudancas-mvp', intent_id: 'post-launch-mvp-change-prioritization-pt', locale: 'pt-BR',
    path: '/blog/mvp-pos-lancamento-priorizar-mudancas/', canonical_url: `${BLOG_ORIGIN}/blog/mvp-pos-lancamento-priorizar-mudancas/`,
    digest: '665b96f5b6df7b8076203b693ebf5b929f06c9657a0e5ad0c8f1b7485590a8ae', digestScope: 'file',
    assets: [
      { path: 'torno-sinais-ficha-decisao.svg', digest: '621a15a61803c874da975258499ccb979fd2cad0675230e463ec9d286e8c1712' },
      { path: 'torno-ciclo-priorizacao-mvp.svg', digest: '16a743ff23c57771738e81ac5efe906759723b722c69fa58fd51a21d6c4efa37' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261020-prova-restauracao-backup', intent_id: 'buyer-proof-software-backup-restore-pt', locale: 'pt-BR',
    path: '/blog/prova-restauracao-backup-software/', canonical_url: `${BLOG_ORIGIN}/blog/prova-restauracao-backup-software/`,
    digest: '3578ab18ab6527c8d5665df7bc3bd73f60adb8f0b911bee96fd819bb6949f6b4', digestScope: 'file',
    assets: [
      { path: 'torno-prova-fluxo-restauracao.svg', digest: '11b8fdbcf238328a154da8bb8591732739cb48f2b689c7631d04c9dd4b55d0b7' },
      { path: 'torno-ficha-prova-restauracao.svg', digest: 'beea8223b20c5dce7fbe61875d036d8e1a94bdc016c41dfd5b08aa71386962c3' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261020-evento-duplicado', intent_id: 'buyer-integration-duplicate-event-acceptance-pt', locale: 'pt-BR',
    path: '/blog/integracao-evento-duplicado-regra-negocio/', canonical_url: `${BLOG_ORIGIN}/blog/integracao-evento-duplicado-regra-negocio/`,
    digest: '3c76f468d5d7133b8bec77e0b9503452da224f7b68adb9ca521b7435e61360e8', digestScope: 'file',
    assets: [
      { path: 'mesmo-evento-efeito.svg', digest: 'e9d287f0ac40375e6778bbdc9105a681bc663a03e81de495c45dfae1bfe2d876' },
      { path: 'aceite-evidencias.svg', digest: '69d74175d95e5c5a5e3b41e9d87a6c2798501ac5a15c4a9dd0ec77a730e9d0b8' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261020-teste-carga-evidencias', intent_id: 'buyer-load-test-evidence-pt', locale: 'pt-BR',
    path: '/blog/teste-carga-evidencias-liberar-sistema/', canonical_url: `${BLOG_ORIGIN}/blog/teste-carga-evidencias-liberar-sistema/`,
    digest: '2e3f8187960ac55bddd1fa2a918c68f2a419142c781963187d55bed8a33166d2', digestScope: 'file',
    assets: [
      { path: 'torno-carga-cenario.svg', digest: 'b408ead51a00b0cca37920ef5f408e6be223b84e17041fd39bae9a7daa36b4f8' },
      { path: 'torno-carga-relatorio.svg', digest: 'f74cc41ffa7f3fbdbaec2934713624ba2f9ce6147c54a1cbd45241ce659f6c3a' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261021-permissoes-acesso', intent_id: 'buyer-access-permissions-business-rules-pt', locale: 'pt-BR',
    path: '/blog/permissoes-acesso-software-regras-negocio/', canonical_url: `${BLOG_ORIGIN}/blog/permissoes-acesso-software-regras-negocio/`,
    digest: 'c1b602c5509387bf4dd3ee76a0ec6fa476a24b337710fa3e577ba5fa97ae1711', digestScope: 'file',
    assets: [
      { path: 'matriz-permissoes.svg', digest: '04e92197932078473a72da7cc3a5463f9167e2cc6cdfb6a4f739ac1b7f522825' },
      { path: 'regra-cenarios-evidencia.svg', digest: '730ddedcba13d5b259cd13b92f4b413421746e8e7e8357323f9f7a7044a890ab' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261021-trilha-auditoria', intent_id: 'buyer-audit-trail-business-requirements-pt', locale: 'pt-BR',
    path: '/blog/trilha-auditoria-sistema-requisitos-negocio/', canonical_url: `${BLOG_ORIGIN}/blog/trilha-auditoria-sistema-requisitos-negocio/`,
    digest: '4c2410d08fe0b0be5f023540d35cae00b338bef54065efde7a21a4b8c2ecd359', digestScope: 'file',
    assets: [
      { path: 'ficha-evento-auditoria.svg', digest: '8274c5147b8ad9d085e6c7fcdc80febea5c3286105963d1010afcce11fa7b64e' },
      { path: 'do-evento-a-evidencia.svg', digest: '2667097334d5c848846d03b88e22c49c9e1fd9d8073e7b23449963908a8d2b11' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261021-plano-rollback', intent_id: 'buyer-release-rollback-plan-pt', locale: 'pt-BR',
    path: '/blog/plano-rollback-atualizacao-sistema/', canonical_url: `${BLOG_ORIGIN}/blog/plano-rollback-atualizacao-sistema/`,
    digest: '1345bf9331cebbb888610f4ccb276ff143ac382c2d78df7e5d83ecd6e95f95c1', digestScope: 'file',
    assets: [
      { path: 'torno-rollback-gatilhos-responsaveis.svg', digest: '5aea1d35e09545ce0f86b9bb2367d59ebe362446334e37766065d3048718e081' },
      { path: 'torno-rollback-limites-verificacao.svg', digest: '3fd31e622739f75e4105a052f945ad7abc1e662996c0e9a6755217c0f9715918' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261022-acessibilidade-aceite', intent_id: 'buyer-software-accessibility-acceptance-pt', locale: 'pt-BR',
    path: '/blog/acessibilidade-software-sob-medida-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/acessibilidade-software-sob-medida-aceite/`,
    digest: '8fa056dff85b9f0daa48406e139e005a516dedc58f02d97757cc177e280463f4', digestScope: 'file',
    assets: [
      { path: 'torno-acessibilidade-fluxo-aceite.svg', digest: 'b2c6fc34dcf03b4acae09e12e7b7ae03fea3c32a08f43305d51c973abe5f5ae7' },
      { path: 'torno-acessibilidade-evidencia-pendencias.svg', digest: '318327f4df29a6c80fbdc43b89dff5384e36a2f1017d1a580cce985b0d9da7bf' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261022-ambiente-homologacao', intent_id: 'buyer-staging-environment-readiness-pt', locale: 'pt-BR',
    path: '/blog/ambiente-homologacao-conferir-antes-testar-sistema/', canonical_url: `${BLOG_ORIGIN}/blog/ambiente-homologacao-conferir-antes-testar-sistema/`,
    digest: '0f0708be733aadb46390d2a0311c33b310ce6a88569b51ac12b379cde64dc7e0', digestScope: 'file',
    assets: [
      { path: 'torno-homologacao-conexoes-ambiente.svg', digest: 'e6d1ce9cb0e84e1cb2a7e86d5be462a3b2cc3080e8fcedd2d25a9498cae901e3' },
      { path: 'torno-homologacao-destino-pendente.svg', digest: 'c23c1544eca71aecb3778c3e703e4801b2dd87b837e972c4920e1cc4ebb66718' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261022-monitoramento-alertas', intent_id: 'buyer-software-monitoring-actionable-alerts-pt', locale: 'pt-BR',
    path: '/blog/monitoramento-software-alertas-fluxo-critico/', canonical_url: `${BLOG_ORIGIN}/blog/monitoramento-software-alertas-fluxo-critico/`,
    digest: 'ce937c915771947017a402ec3b160244feb60ebc1fd51d66eb51d73c443558d5', digestScope: 'file',
    assets: [
      { path: 'torno-acordo-alerta-fluxo.svg', digest: '66a5ae0ed1d908ded471ae3970733ba29285d3476340fec7c1cb00165dc29bb5' },
      { path: 'torno-ensaio-cadeia-alerta.svg', digest: '4e598773dd63b98f3fb041f8c91488c8be811e0d8536f43b8b013518e4e221a4' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261023-limites-api-cota', intent_id: 'buyer-integration-api-quota-behavior-pt', locale: 'pt-BR',
    path: '/blog/limites-api-integracao-cota/', canonical_url: `${BLOG_ORIGIN}/blog/limites-api-integracao-cota/`,
    digest: '16ce502784889115fc254eae1de18b58f77947dc52e55b1b78906796b333974a', digestScope: 'file',
    assets: [
      { path: 'torno-api-cota-pendencia.svg', digest: '5509b338eedac92a5ac3a015f188b6da8777574527cab6cc93c47dd8ec31e8ae' },
      { path: 'torno-api-cota-evidencia.svg', digest: 'eea3cc3b7623173c9efa67a182ad5954a24acf64726b31f598286f2663289952' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261023-importacao-planilhas-erros', intent_id: 'buyer-recurring-spreadsheet-import-validation-pt', locale: 'pt-BR',
    path: '/blog/importacao-planilhas-sistema-tratar-erros/', canonical_url: `${BLOG_ORIGIN}/blog/importacao-planilhas-sistema-tratar-erros/`,
    digest: 'c2deb1fc418d548a2b4f9c003654a86081910ac4e4a6bd222bb61f89e064b95f', digestScope: 'file',
    assets: [
      { path: 'torno-importacao-fluxo.svg', digest: '6911a8c890de53b55dcc378560551b4ddd19efbe9befc70b462a3fc5894ea231' },
      { path: 'torno-importacao-erros.svg', digest: 'df18dc1db078299321ecd7a5a037941985ef5226deb634bfb94cc816bc519ec4' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261023-datas-fusos', intent_id: 'buyer-date-time-business-rules-acceptance-pt', locale: 'pt-BR',
    path: '/blog/datas-fusos-sistema-prazos-relatorios/', canonical_url: `${BLOG_ORIGIN}/blog/datas-fusos-sistema-prazos-relatorios/`,
    digest: 'af589e75b6907bff2685780b8fc453d5cc74b63e8716a7c9f56f1f15f7ab791e', digestScope: 'file',
    assets: [
      { path: 'torno-datas-regras.svg', digest: 'cf77ae7cfaa66223fcdad4f9947a3bd8b6dbc4bf02c39344bb53bd83d0fc0542' },
      { path: 'torno-datas-aceite.svg', digest: '14fb71feacac0245aec89ba8508d783aedc508caea840ebb4ce379feee5148e2' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261026-edicao-simultanea', intent_id: 'buyer-concurrent-edit-conflict-acceptance-pt', locale: 'pt-BR',
    path: '/blog/edicao-simultanea-sistema-conflitos/', canonical_url: `${BLOG_ORIGIN}/blog/edicao-simultanea-sistema-conflitos/`,
    digest: 'c96209b7141ce8f22ac00a98990af7545c384291f6068560d416492bb2752a01', digestScope: 'file',
    assets: [
      { path: 'torno-edicao-simultanea-fluxo.svg', digest: 'd966766c3ea27b4698e6cea009f4152efeab015610f24b0fa439786fb8445624' },
      { path: 'torno-edicao-simultanea-aceite.svg', digest: '8a7117d75b07e8b3a28c7cf9de2fbeec0214b6aa0f0a959ae75427d16ed3b12e' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261026-exportacao-dados', intent_id: 'buyer-recurring-data-export-acceptance-pt', locale: 'pt-BR',
    path: '/blog/exportacao-dados-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/exportacao-dados-sistema-aceite/`,
    digest: '8ce0ca37bf6cf036c9c5cad1ece95442ce2ec329252241c3688b777feeb4e5e9', digestScope: 'file',
    assets: [
      { path: 'torno-exportacao-contrato.svg', digest: 'ffd74cdcd4578e253a548f058e4171c5d4889aa6bd47b2bbf3f744414d8e08a7' },
      { path: 'torno-exportacao-aceite.svg', digest: 'ffb9646f9767c977162202f09c4c068c5c79396bf7cd0755b2a11fd6be89560b' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261026-emails-sistema', intent_id: 'buyer-transactional-email-delivery-acceptance-pt', locale: 'pt-BR',
    path: '/blog/emails-sistema-envio-entrega-falha/', canonical_url: `${BLOG_ORIGIN}/blog/emails-sistema-envio-entrega-falha/`,
    digest: '5de6946d981f0d136755d30530e2686e069867cd503070a6d15fa3e41b4205bb', digestScope: 'file',
    assets: [
      { path: 'torno-email-etapas.svg', digest: '6f4cda23195e67ecf29a37f11c5cad9498afa39dcd3568b95445a402f4290633' },
      { path: 'torno-email-evidencias.svg', digest: 'c2598459f3dd63ccfdf718d7a140ad7704604a1e7376b06b8582562d92716aae' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261027-anexos', intent_id: 'buyer-attachment-upload-access-acceptance-pt', locale: 'pt-BR',
    path: '/blog/anexos-sistema-envio-consulta-arquivos/', canonical_url: `${BLOG_ORIGIN}/blog/anexos-sistema-envio-consulta-arquivos/`,
    digest: 'eabce03e8a95fdf5075e3c46195dabcc934be9e96c497f1ce6bc5a1f877e0c10', digestScope: 'file',
    assets: [
      { path: 'torno-anexo-estados.svg', digest: '90817b55a2b4168aa0e2dbff5818358807af53573514d53f75f68a83ad4bb476' },
      { path: 'torno-anexo-aceite.svg', digest: '3f8303cf394b8c90a1192df1d3d3387805750667afd5291dab58d32ad25c2644' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261027-fluxo-aprovacao', intent_id: 'buyer-approval-workflow-business-rules-pt', locale: 'pt-BR',
    path: '/blog/fluxo-aprovacao-sistema-regras/', canonical_url: `${BLOG_ORIGIN}/blog/fluxo-aprovacao-sistema-regras/`,
    digest: '0d530977411b09950c8e3cf263d4f52e683c3ae3d6b9e19be8bd4c1e4d9cdfb2', digestScope: 'file',
    assets: [
      { path: 'torno-aprovacao-estados.svg', digest: '98f47765a9590c7dbb99135c57f05bf7d521dae8001320b973c93fe4666ca83c' },
      { path: 'torno-aprovacao-aceite.svg', digest: '855e8634986a7ad68a33f6de73e0b5fc5964092fc4ed3830ebeb792a7487411c' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261027-busca-filtros', intent_id: 'buyer-search-filter-results-acceptance-pt', locale: 'pt-BR',
    path: '/blog/busca-filtros-sistema-resultados/', canonical_url: `${BLOG_ORIGIN}/blog/busca-filtros-sistema-resultados/`,
    digest: '6b1bc35e827131fa62b543bee0c3a3586f0d5748b77596b438fe6502039bd285', digestScope: 'file',
    assets: [
      { path: 'torno-busca-contrato.svg', digest: '916e384944206208b5e61d710306d38f5fde9a16c5ab84425727cf0d7fac44a5' },
      { path: 'torno-busca-aceite.svg', digest: '8c65e0c4c367965404db98887ac4dc48e5c27429a628836c3b1e95bb9fbf18de' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261028-recuperacao-senha', intent_id: 'buyer-password-recovery-flow-acceptance-pt', locale: 'pt-BR',
    path: '/blog/recuperacao-senha-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/recuperacao-senha-sistema-aceite/`,
    digest: 'bb32f48d4f0c97dc8f1f40f67531a36456af3c982d29db46cf63b21d65c79c22', digestScope: 'file',
    assets: [
      { path: 'torno-recuperacao-etapas.svg', digest: '6b4fc8afbd3b329a8083efd4f2839f381a5d9d303bbcee6a32ad90b1263d53c8' },
      { path: 'torno-recuperacao-aceite.svg', digest: '332b28d0a04de5192fd24760983ca6f4c05f1b36eb9fed976c3ec37e07163b96' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261028-arquivar-excluir', intent_id: 'buyer-record-archive-delete-dependencies-acceptance-pt', locale: 'pt-BR',
    path: '/blog/arquivar-excluir-registros-sistema/', canonical_url: `${BLOG_ORIGIN}/blog/arquivar-excluir-registros-sistema/`,
    digest: '69b039af4c60e47c6d377f62b8a74c8b72d113a7f6b9ffe3fa212721ec3d219d', digestScope: 'file',
    assets: [
      { path: 'torno-registros-acoes.svg', digest: '71a67d2f7f49b0f3adee5d7a68326c45d4edd8379ddde26d4b3c98d97514df26' },
      { path: 'torno-registros-aceite.svg', digest: '769218a1fcc609cd1d1a7c64002827293f1e9b5f24903515e7bfcc57c032a09d' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261028-cancelamento-solicitacao', intent_id: 'buyer-operation-cancellation-outcome-acceptance-pt', locale: 'pt-BR',
    path: '/blog/cancelamento-solicitacao-sistema/', canonical_url: `${BLOG_ORIGIN}/blog/cancelamento-solicitacao-sistema/`,
    digest: '7bea1c7c30e961029874213afe6d7bdd8f9d6c371fc755191374e5a9d6a81672', digestScope: 'file',
    assets: [
      { path: 'torno-cancelamento-estados.svg', digest: 'aca488f85f6f2de4d03174324543053537b9cf813a917a876bd7fafbe4dc33ca' },
      { path: 'torno-cancelamento-aceite.svg', digest: '81b6e1088377fdc90c67f8b20592ebf66e253c36c5da1a02aa9f446c753af9e9' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261029-valores-monetarios', intent_id: 'buyer-monetary-rounding-business-rules-acceptance-pt', locale: 'pt-BR',
    path: '/blog/valores-monetarios-arredondamento-sistema/', canonical_url: `${BLOG_ORIGIN}/blog/valores-monetarios-arredondamento-sistema/`,
    digest: 'af8758a4b9a209d3e6c17c3510b2695e8fccee1529c077e53dc9945e8a2334db', digestScope: 'file',
    assets: [
      { path: 'torno-monetarios-regras.svg', digest: 'd6b004f2b06c899f32efc08cd6d87840bc1312887738c0d67413d8b2104d550f' },
      { path: 'torno-monetarios-aceite.svg', digest: '30890b39967923559de9a0be016d1d151d58a5ad6245daf3a8d1d27a11cc9d0b' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261029-eventos-fora-ordem', intent_id: 'buyer-out-of-order-integration-events-acceptance-pt', locale: 'pt-BR',
    path: '/blog/integracao-eventos-fora-ordem/', canonical_url: `${BLOG_ORIGIN}/blog/integracao-eventos-fora-ordem/`,
    digest: 'd3db36d1575aba85a547417e0880ce69e80d02f0dc87ae53d645b2ef747aac07', digestScope: 'file',
    assets: [
      { path: 'torno-eventos-ordem.svg', digest: 'd60dcbf6b9ef8e85803825054deb4eae0411ff305c0d9cacc12a603560b8c781' },
      { path: 'torno-eventos-aceite.svg', digest: 'a7287fad774ad1f6987c1bf41f15a65aa7d011a5d38a58008093970a32e0300d' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261029-liberacao-gradual', intent_id: 'buyer-production-pilot-rollout-acceptance-pt', locale: 'pt-BR',
    path: '/blog/liberacao-gradual-funcionalidade-piloto/', canonical_url: `${BLOG_ORIGIN}/blog/liberacao-gradual-funcionalidade-piloto/`,
    digest: '9e19e3ba58ff1a486df37c39728212ca836d149d329be47c693cdc17e4dee71b', digestScope: 'file',
    assets: [
      { path: 'torno-piloto-escopo.svg', digest: '6178656bf68a99ccc6334ff30777975a44b2bd9b3cb4bc69cbeca9b7aac96bb8' },
      { path: 'torno-piloto-decisao.svg', digest: '894d66dc90210347ef25c14b4d2421d2ce5dd354f859b750bb2b3efbd7c9f4a8' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261030-sistema-sem-internet', intent_id: 'buyer-offline-data-sync-acceptance-pt', locale: 'pt-BR',
    path: '/blog/sistema-sem-internet-dados-sincronizacao/', canonical_url: `${BLOG_ORIGIN}/blog/sistema-sem-internet-dados-sincronizacao/`,
    digest: '8bcfd94a4508c9d77058d0508d2d3638d0883a7d1cefaac30ee2ec93f0d1c84e', digestScope: 'file',
    assets: [
      { path: 'torno-offline-mapa.svg', digest: 'df9de257ca807247ad3821ab71d4d707f4a9c09c9d6f8ffca750eb9e44f4f13a' },
      { path: 'torno-registro-passaporte.svg', digest: '3aa343c04588a6e33e888ed8c3ea491eab6da1f3135611b7185b58796afc921e' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261030-agente-erp-permissoes', intent_id: 'buyer-ai-agent-erp-action-permissions-pt', locale: 'pt-BR',
    path: '/blog/agente-ia-erp-permissoes-acoes/', canonical_url: `${BLOG_ORIGIN}/blog/agente-ia-erp-permissoes-acoes/`,
    digest: 'bd62a4a62797602e5f4da6abb615b1856789ef16087f3f738c1954d78bc5af0d', digestScope: 'file',
    assets: [
      { path: 'torno-agente-erp-tres-niveis.svg', digest: '18ee3daf4e48c11ddd2d8e3e083279e1b191474eb7b992d0cb683e50d77c893f' },
      { path: 'torno-agente-erp-matriz.svg', digest: '9182dfd7b60a43d64882ab50b43b8b0691ef278dc63f7cebfe212605d5cfdff1' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261030-mfa-aceite', intent_id: 'buyer-mfa-system-scope-acceptance-pt', locale: 'pt-BR',
    path: '/blog/autenticacao-dois-fatores-sistema-requisitos-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/autenticacao-dois-fatores-sistema-requisitos-aceite/`,
    digest: '4a9bf76b592884b84f2620a52d6cc4f38686a8ea0f6b69cc92fc806370615aeb', digestScope: 'file',
    assets: [
      { path: 'torno-mfa-duas-portas.svg', digest: '30bb75daa795c14f154ae69bc29ee9ff48f2b3be3063e090cbdf2e1bbfdcb321' },
      { path: 'torno-mfa-caderno-ensaios.svg', digest: '0a38592c18e0c1ee4e783224c18946249c9ffe1e7b8e789ebfae993edeaa5d28' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261102-isolamento-multiempresa', intent_id: 'buyer-multitenant-isolation-acceptance-pt', locale: 'pt-BR',
    path: '/blog/sistema-multiempresa-isolamento-dados-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/sistema-multiempresa-isolamento-dados-aceite/`,
    digest: '63ce1cc1a12e21ecb8557fb67b979e7c40f868e442ed66e99fa43f2018128187', digestScope: 'file',
    assets: [
      { path: 'torno-multiempresa-vitrines.svg', digest: '42f92e8758d72c518bfef6f66d662156ce96fa176295d5a6f3c763255138301b' },
      { path: 'torno-multiempresa-ensaio.svg', digest: 'c4fc22a99b6e896bd053513ea3ca34d50821ff6a8ebe81d56afdd5041571b227' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261102-leitor-codigo-barras', intent_id: 'buyer-barcode-scanner-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/leitor-codigo-barras-sistema-requisitos-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/leitor-codigo-barras-sistema-requisitos-aceite/`,
    digest: 'a8f3632b4d36bcbbfb0cd6510de1b2a294ef41bac738b259bcb00b3975811d6f', digestScope: 'file',
    assets: [
      { path: 'torno-bancada-leitura.svg', digest: '98bc3692d04c69aa09eae0e2d9501f796bca3db37eecf849d686778bb238a351' },
      { path: 'torno-etiquetas-ensaio.svg', digest: 'f12345b795cf4e4ea7e387dfe761de8ed41b536b2e3cccfdd3a50f3878e14b05' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261102-assinatura-status', intent_id: 'buyer-esign-system-status-acceptance-pt', locale: 'pt-BR',
    path: '/blog/assinatura-eletronica-sistema-status-documento-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/assinatura-eletronica-sistema-status-documento-aceite/`,
    digest: 'e2a17685901aa2f20895a0f5474246bc5b5caa34985dcbc5867d251710dd791f', digestScope: 'file',
    assets: [
      { path: 'torno-documento-estados.svg', digest: '94673132873bec579afaf5e795fa4f7641cdf9294fad5da559eefff3bf8aaf50' },
      { path: 'torno-assinatura-recibo.svg', digest: '3295bfbf4dc1a7be47042bbc4c9bb96af7bac4924777b1997758d3578d6e6fd6' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261103-ocr-pdf-revisao', intent_id: 'buyer-ocr-pdf-data-review-acceptance-pt', locale: 'pt-BR',
    path: '/blog/ocr-pdf-sistema-revisao-dados-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/ocr-pdf-sistema-revisao-dados-aceite/`,
    digest: '921f4ca3343ebfbc6facc11869be8fed7d8ca026e2233e8fa8c7a47c2c12d171', digestScope: 'file',
    assets: [
      { path: 'torno-pdf-campos.svg', digest: '2f5dabb668ee6ee5b6f18e5a599eba21c2655b66f36540e9ad7ef4a108328805' },
      { path: 'torno-pdf-conferencia.svg', digest: '703e2c4047801753dd7f534a0f9c21fb54d725821f37e57a1e2c8fa8a6805912' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261103-login-unico-sso', intent_id: 'buyer-internal-system-sso-access-lifecycle-pt', locale: 'pt-BR',
    path: '/blog/login-unico-sso-sistema-interno-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/login-unico-sso-sistema-interno-aceite/`,
    digest: '16be8a7cfdd64e473367d641914368e234d26bcf09f5b3f43a5024d28202c6f9', digestScope: 'file',
    assets: [
      { path: 'torno-sso-portas.svg', digest: 'c842c7ef7e46c917465ebabc8988c10144431f300f80e2571ee7b64b15b82fdc' },
      { path: 'torno-sso-saida.svg', digest: '52af59426e13cdde4627e38085a9954786be26e7f9a1cf94e20c230cc0a65174' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261103-whatsapp-avisos', intent_id: 'buyer-whatsapp-system-notifications-acceptance-pt', locale: 'pt-BR',
    path: '/blog/whatsapp-sistema-avisos-automaticos-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/whatsapp-sistema-avisos-automaticos-aceite/`,
    digest: '8170ec26a8b6cc6d507528d7bbf6ef606b006d1c68b74eef80cc073b956a5238', digestScope: 'file',
    assets: [
      { path: 'torno-whatsapp-pedido.svg', digest: '4da6716af030af0a3730862511d2874b596c2b67ebe1c58053232344c66c9c08' },
      { path: 'torno-whatsapp-resposta.svg', digest: 'a54f82b14d7902092a9e9e649924b0db4ac61b84410e2a5a2b1985aff2ef3d89' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261104-dashboard-erp-divergencias', intent_id: 'buyer-dashboard-erp-metric-reconciliation-pt', locale: 'pt-BR',
    path: '/blog/dashboard-erp-numeros-divergentes-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/dashboard-erp-numeros-divergentes-aceite/`,
    digest: '17af47218f9fc87946fc677504429d92b7ec51658b50bfa4b9955660d322b588', digestScope: 'file',
    assets: [
      { path: 'torno-painel-lentes.svg', digest: 'bac06803722a928e1fdccc71518f0520ff9f9c3eab123ee0a1bfc85aed50d7f3' },
      { path: 'torno-painel-relogio.svg', digest: '25608a0f6886944b6ae1de7fdf8609c3c6c42f3dba39c4f732f9ad0e500a9335' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261104-agendamento-reserva-dupla', intent_id: 'buyer-scheduling-double-booking-acceptance-pt', locale: 'pt-BR',
    path: '/blog/sistema-agendamento-reserva-dupla-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/sistema-agendamento-reserva-dupla-aceite/`,
    digest: '09570877691f5d03639bb9c4332329b802de492895fd677dd152b185a0822838', digestScope: 'file',
    assets: [
      { path: 'torno-agenda-sobreposicao.svg', digest: '0b43f6ff13b7b26832706fb139adc05e21b4882c953cb983c999d63f074d8863' },
      { path: 'torno-agenda-duas-tentativas.svg', digest: '93e897ce6dce1d1215eaca8ba38f17999d2185e43a79df6c8e253a8102b04d75' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261104-pagamentos-status', intent_id: 'buyer-payment-integration-order-status-acceptance-pt', locale: 'pt-BR',
    path: '/blog/integracao-pagamentos-status-pedido-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/integracao-pagamentos-status-pedido-aceite/`,
    digest: '7fec1f79d3421976cdce7eb4c769864bf43cc51c81f387ab47cba5d9d208a8cc', digestScope: 'file',
    assets: [
      { path: 'torno-pagamentos-prancheta.svg', digest: '204aebe2878ff8e6b140cdce5832596cba7ea3465fa35ffafb1d12038a2eeb54' },
      { path: 'torno-pagamentos-ensaio.svg', digest: '0094535b1115ddea970fe1c0842c93bd9544ee6806c0bea2beb5ec4b57a5bc34' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261104-web-push-pwa', intent_id: 'buyer-web-push-pwa-notifications-acceptance-pt', locale: 'pt-BR',
    path: '/blog/notificacoes-push-pwa-app-web-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/notificacoes-push-pwa-app-web-aceite/`,
    digest: 'f1655a5aa66156edef3f0a0ef9d0f772225458d649bebe3e6bf208e45c4a4752', digestScope: 'file',
    assets: [
      { path: 'torno-push-quatro-telas.svg', digest: 'fca955c395709db2ae14ce1000fe5ee6857e5eae1f7b63d1f92e40c83c292c00' },
      { path: 'torno-push-validade.svg', digest: '0ee942fcec6712d80cba8cacda315fcf849d5470d363a6509ab7ee9b119c76a7' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261105-substituto-aprovador', intent_id: 'buyer-approval-delegation-absence-acceptance-pt', locale: 'pt-BR',
    path: '/blog/substituto-aprovador-ausencia-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/substituto-aprovador-ausencia-sistema-aceite/`,
    digest: '87130fe0820c72c15715865a2ba570f2a5e8bbc3b3fe8e63cd3268c7343d7108', digestScope: 'file',
    assets: [
      { path: 'torno-ausencia-agenda.svg', digest: 'be57862bffaab84b7ca18730abc887ad20f69deff2dfffbd1869dc722a553085' },
      { path: 'torno-substituto-ficha.svg', digest: '69376f9ac02764d27600bfa4618da15ae89bc6d77d76179fb997fbd2ce35a531' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261105-campos-condicionais', intent_id: 'buyer-conditional-form-fields-acceptance-pt', locale: 'pt-BR',
    path: '/blog/campos-condicionais-formulario-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/campos-condicionais-formulario-sistema-aceite/`,
    digest: '0a70dd14c6ce8c2f3308b1100275c7dd430e067b013a9102e3271ec15d0060e7', digestScope: 'file',
    assets: [
      { path: 'torno-campos-condicionais-matriz.svg', digest: '3e42e9b6f99f881fbc551781f03ee45bb366254d88a1428af85da598c9a571e4' },
      { path: 'torno-formulario-duas-respostas.svg', digest: '0ec9c16e075e74b0cbcbd64b0a3c19cd7df88a04fba86abd648d480c04d51cc5' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261105-sessao-formulario', intent_id: 'buyer-session-expiry-unsaved-form-acceptance-pt', locale: 'pt-BR',
    path: '/blog/sessao-expirada-formulario-dados-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/sessao-expirada-formulario-dados-aceite/`,
    digest: 'f0f5090555b5a1de6f819b423046cecf99b7efd3e3c6e8f0ec13f43eb6e5fc52', digestScope: 'file',
    assets: [
      { path: 'torno-sessao-formulario.svg', digest: 'c560824ab695f0ff7225dd078982ec61679a2237f7c7a17bb3f45659babd3e6e' },
      { path: 'torno-sessao-ensaios.svg', digest: '1c76f2ab8e0d9173c8c650c8909c3967ecdd9c821743bde51e58868072dc74ce' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261105-nfe-ibs-cbs', intent_id: 'buyer-nfe-reforma-tributaria-ibs-cbs-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/nfe-reforma-tributaria-ibs-cbs-sistema-aceite/`,
    digest: '2dc47a41f50ffe6bb18735d50b9b5e35006f5a695629d033609854ed23496814', digestScope: 'file',
    assets: [
      { path: 'torno-nfe-regua-datas.svg', digest: '08670380a49d1ef9f07509604ca7a55f52f5b44bb07bd9dfd77d3ce41eb26b2a' },
      { path: 'torno-nfe-dois-carimbos.svg', digest: 'b9b3c40114094fdf9ff443218f2be3cfd58e1194bec29bac54adc8b532e1e14a' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261106-versionamento-api', intent_id: 'buyer-api-version-migration-acceptance-pt', locale: 'pt-BR',
    path: '/blog/versionamento-api-integracao-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/versionamento-api-integracao-aceite/`,
    digest: '219f36885fb9abafa1bc54456930e1ac928aeac9f1e75ca4fb397ce64b380f2e', digestScope: 'file',
    assets: [
      { path: 'torno-versoes-ponte.svg', digest: '188fd1709835690f58127487ea77e719d0a277d4044c888d20842b672cebd512' },
      { path: 'torno-versoes-lupa.svg', digest: '802e70360fea31aba36d9f3a90dd0921f9a023c30777385f76cba5c0007ff59c' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261106-dados-maquina-erp', intent_id: 'buyer-machine-data-erp-integration-pt', locale: 'pt-BR',
    path: '/blog/dados-maquina-erp-integracao-opc-ua/', canonical_url: `${BLOG_ORIGIN}/blog/dados-maquina-erp-integracao-opc-ua/`,
    digest: '48c1d76d3d7a2fe1b82f0d06928ee813ef63dbd50525022832ed5b443a919bc2', digestScope: 'file',
    assets: [
      { path: 'torno-dados-maquina-lentes.svg', digest: '2010096ceac7b177f38ad4469f58d07b4e86bb63967e2cb35a3970813c054114' },
      { path: 'torno-dados-maquina-ficha.svg', digest: '4ce5000aec7758190aa1506f4b92b31e5602423e3d2f1d0ab7ae320279548a8a' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261106-lgpd-pedido-titular', intent_id: 'buyer-lgpd-data-subject-request-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/lgpd-pedido-titular-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/lgpd-pedido-titular-sistema-aceite/`,
    digest: '918aa3c87a92dc51a09e031783e2d48a3d2a08ee46d560d46fe378158e4d343e', digestScope: 'file',
    assets: [
      { path: 'torno-lgpd-camadas.svg', digest: 'c1cc89e2a31b3547151cb6b2f66f36b5621d2cfb4c854bba274c7021f1e2684e' },
      { path: 'torno-lgpd-envelope-resposta.svg', digest: '7ab0ed187031094d6c2dd9beeb63374428b5f201997c69c909da2678c17bfcdc' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261107-conciliacao-bancaria', intent_id: 'buyer-bank-reconciliation-automation-acceptance-pt', locale: 'pt-BR',
    path: '/blog/conciliacao-bancaria-sistema-extrato-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/conciliacao-bancaria-sistema-extrato-aceite/`,
    digest: 'f383bc496ce03fca459dcb1b0bef8061154f6532c5ad3960ae8fb8dc08bd8670', digestScope: 'file',
    assets: [
      { path: 'torno-conciliacao-encaixe.svg', digest: '3b68cb34802d55881533e240847f86d8ceabd5b152dfe44b310f308c5ebc9235' },
      { path: 'torno-conciliacao-bandejas.svg', digest: '1945a9109a361db3764c633a459cd12c533b56a73a4cf6d4802cf08a54e652ad' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261109-comissao-vendedores', intent_id: 'buyer-sales-commission-rules-acceptance-pt', locale: 'pt-BR',
    path: '/blog/comissao-vendedores-sistema-regras-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/comissao-vendedores-sistema-regras-aceite/`,
    digest: 'c73df8600220ec4b030e2de9dc3a5c1908b5e0bfe9ed790a3dea2c1eb31d7dc9', digestScope: 'file',
    assets: [
      { path: 'torno-comissao-faixas.svg', digest: 'a7716182c4f0112bc84d016583d4496e225de98e9ec5a914408945031788c565' },
      { path: 'torno-comissao-extrato.svg', digest: '92cf392a6db4cc00d541cee2e76721ec289aa80c10f0324232453e4bd8aa54b6' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261109-pix-automatico', intent_id: 'buyer-pix-automatico-recurring-billing-acceptance-pt', locale: 'pt-BR',
    path: '/blog/pix-automatico-cobranca-recorrente-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/pix-automatico-cobranca-recorrente-sistema-aceite/`,
    digest: '87061af943d3bfb3eba0391b203872d129a79e705e30813b7234138bc39ca1eb', digestScope: 'file',
    assets: [
      { path: 'torno-pix-regua-parcela.svg', digest: '9edf83140db7bc4c63bfdb0b01563f56ddef263bc4f66d627402edbe5e4096d3' },
      { path: 'torno-pix-tres-chaves.svg', digest: '8eb342477b74b2eae8137505065a533fd0c0154ad0cf1ac78dfdca751c52dc62' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261109-marketplace-estoque', intent_id: 'buyer-marketplace-integration-stock-orders-acceptance-pt', locale: 'pt-BR',
    path: '/blog/integracao-marketplace-estoque-pedidos-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/integracao-marketplace-estoque-pedidos-aceite/`,
    digest: 'df94467a044b012a5532fdab89680b9ffa1fa62bdd911b563a17388099cce143', digestScope: 'file',
    assets: [
      { path: 'torno-marketplace-camadas-estoque.svg', digest: 'a4f1148396a3008122bda03df374efde228c214031294fb1b6f6c4ed60e63960' },
      { path: 'torno-marketplace-ultima-unidade.svg', digest: '4ffecee86e69cbe57129446c2f5976774c57027a3601a91e103ba80dbfd133b0' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261110-estoque-lote-validade', intent_id: 'buyer-inventory-lot-expiry-fefo-traceability-acceptance-pt', locale: 'pt-BR',
    path: '/blog/estoque-lote-validade-fefo-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/estoque-lote-validade-fefo-sistema-aceite/`,
    digest: '700a6bf180041a29fcbb8c39a3c233855d10ea7234afb856de994a5ad3803fb3', digestScope: 'file',
    assets: [
      { path: 'torno-lote-etiqueta-gs1.svg', digest: '7202f5105003c5248675bf817b132bea72ab4376a7465d329bfb6e4fa017ae9b' },
      { path: 'torno-lote-arvore-rastreio.svg', digest: '16fe4fa35e1340c544c67001638a7fd5d574e073aeefad3497b9955bbec7d677' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261110-sla-horas-uteis', intent_id: 'buyer-helpdesk-sla-business-hours-pause-acceptance-pt', locale: 'pt-BR',
    path: '/blog/sla-horas-uteis-sistema-chamados-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/sla-horas-uteis-sistema-chamados-aceite/`,
    digest: 'ec712d21f7067e66a267dfd6cbe956cc9fadc8c6b4927352a1de963da8d2e44e', digestScope: 'file',
    assets: [
      { path: 'torno-sla-regua-semana.svg', digest: '58c0f28ba4d4eaafdd24fb6a77ee4c36934382382b0ed5a534b052f66670b858' },
      { path: 'torno-sla-cronometro-estados.svg', digest: '962b0753377ba54d813ee44aa60f7de3f287455c61039c3638b7a7aa555c4463' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261110-cnpj-alfanumerico', intent_id: 'buyer-alphanumeric-cnpj-system-adaptation-acceptance-pt', locale: 'pt-BR',
    path: '/blog/cnpj-alfanumerico-sistema-adaptar-testar/', canonical_url: `${BLOG_ORIGIN}/blog/cnpj-alfanumerico-sistema-adaptar-testar/`,
    digest: '40a19ff4c2637380e9493ddae0182c0bcbea663c91d47dc450ecf783fb12fa2a', digestScope: 'file',
    assets: [
      { path: 'torno-cnpj-mapa-sistema.svg', digest: '323b91393c3ff448e72e6750b6c4d7d289ecb9250138912fab10184078f885da' },
      { path: 'torno-cnpj-calculo-dv.svg', digest: 'aaa0b5a7d6af6fb21b51f70e98b25a62299ce374b1d899994e84b1caec03bced' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261111-nfse-nacional', intent_id: 'buyer-nfse-national-standard-system-integration-acceptance-pt', locale: 'pt-BR',
    path: '/blog/nfse-padrao-nacional-sistema-integracao-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/nfse-padrao-nacional-sistema-integracao-aceite/`,
    digest: '58c551667daf63ee3d0ad51a0e72fe44ef78ae227d5fdcca9fc8f76be4424a49', digestScope: 'file',
    assets: [
      { path: 'torno-nfse-dois-caminhos.svg', digest: 'd3ed1dd3a1e5ec4fe09f1a5152d7d0392012486fc54c0f9e358558515ce4e5a9' },
      { path: 'torno-nfse-vida-da-nota.svg', digest: '69a6c7ea660b4723dc2f81ee48ecbe09dc4ba0419e1cc89d1ecb786c22f2016a' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261111-cadastro-duplicado', intent_id: 'buyer-duplicate-customer-records-dedup-merge-acceptance-pt', locale: 'pt-BR',
    path: '/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/cadastro-duplicado-clientes-sistema-mesclar-aceite/`,
    digest: 'ca54175484cadd4d7f71c1331167c15b7f99bc98109fa64111ef947f2189457d', digestScope: 'file',
    assets: [
      { path: 'torno-duplicado-diferencas.svg', digest: 'b64d3ba62545a6c7301f34848999b2c42e30c7d96c164ef793deff51a46ea5a7' },
      { path: 'torno-duplicado-rios-mesclagem.svg', digest: '803fc7458304761eeb4701e2b03df828b9b3a1abfe7f2358881881faa9b096c4' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261111-documentos-pdf', intent_id: 'buyer-pdf-document-generation-templates-acceptance-pt', locale: 'pt-BR',
    path: '/blog/gerar-documentos-pdf-sistema-modelos-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/gerar-documentos-pdf-sistema-modelos-aceite/`,
    digest: '9ad79625b01fd517f024488b6f1708f519ec50915d56f325df6cfe20a2c98fcf', digestScope: 'file',
    assets: [
      { path: 'torno-pdf-fotografia-emissao.svg', digest: '11c03ce5641d748d03c6aa5b629a7433311c137fd90ff04d5e40ee48cc647dfa' },
      { path: 'torno-pdf-folha-quebra.svg', digest: '5acb012f829a9f18322f1ba50b140442644b3a120f92d059df5337bcdc739e8a' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261112-tabela-precos-descontos', intent_id: 'buyer-price-lists-discount-rules-acceptance-pt', locale: 'pt-BR',
    path: '/blog/tabela-precos-cliente-descontos-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/tabela-precos-cliente-descontos-sistema-aceite/`,
    digest: '326057629f799c012a8610893049e3e06655928befa076986fb3a0184034e4a1', digestScope: 'file',
    assets: [
      { path: 'torno-precos-pilha-peneiras.svg', digest: '8ff8da6bd3328ab3c8e43f68d91e81dde2cc880564a8af3991feb3b8af1592dc' },
      { path: 'torno-precos-etiqueta-pedido.svg', digest: 'c3b8f024ee8f207de9bff9678eec0642b33d96477db8de6b82ba58872e32bcec' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261112-devolucao-troca', intent_id: 'buyer-sales-returns-exchanges-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/devolucao-troca-mercadoria-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/devolucao-troca-mercadoria-sistema-aceite/`,
    digest: '50b04c228eb83706480e9543e1d714e8e89d5ba0cf935480d66b43c39a9949a0', digestScope: 'file',
    assets: [
      { path: 'torno-devolucao-bancada-conferencia.svg', digest: '6df0dd704a9fbd4ed88e15e92dcaa29722fc63b2e816aa3f83b408832a721d8d' },
      { path: 'torno-devolucao-recibo-canhotos.svg', digest: 'f53ea6ee60acde9b269998a54e69e63ba85573989c2d6916f0d8cc81e8219b26' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261112-inventario-contagem', intent_id: 'buyer-inventory-count-adjustment-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/inventario-contagem-estoque-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/inventario-contagem-estoque-sistema-aceite/`,
    digest: '8a1b2a16c399d4a9306e516b34a974c100f45b4dafe39150fab88bbbff70908f', digestScope: 'file',
    assets: [
      { path: 'torno-inventario-estante-relogio.svg', digest: 'e7b4d3bd7bde65f81103188394e06b5ba6d951d4405596a1e2c4eb2f90e96111' },
      { path: 'torno-inventario-ficha-cega.svg', digest: '71055e01ae2404e6b0304601c8938004da5192f50716c7b47157c8dae4e10450' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261113-assistente-ia-documentos', intent_id: 'buyer-internal-documents-ai-assistant-rag-evaluation-acceptance-pt', locale: 'pt-BR',
    path: '/blog/assistente-ia-documentos-internos-testar-respostas/', canonical_url: `${BLOG_ORIGIN}/blog/assistente-ia-documentos-internos-testar-respostas/`,
    digest: '4182729c32fb08e9363882de5a7d364881711be153264b98e72c867cb1400d67', digestScope: 'file',
    assets: [
      { path: 'torno-assistente-arquivo-vigente.svg', digest: '39301d0ef9aaaf4bcd02c72ac8cf0b67bd2ea1810d49cec906283678483e7acc' },
      { path: 'torno-assistente-boletim-prova.svg', digest: 'cd4d37aba5b66d0be5d00b45872df202e1921df0a42ac0298d1c0f4d920de8b5' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261113-oee-sistema', intent_id: 'buyer-oee-calculation-definitions-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/oee-sistema-calculo-definicoes-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/oee-sistema-calculo-definicoes-aceite/`,
    digest: '8ed5607fb42df4393215b6e48cc75a480375428609c8d766001d982b341f22bd', digestScope: 'file',
    assets: [
      { path: 'torno-oee-manometro-tres-regras.svg', digest: 'ad4bdc4c4618a216e06361e97d5e4dd7d0acced56611f5fb2f48bbf9231f611d' },
      { path: 'torno-oee-ampulheta-turno.svg', digest: 'a97117ac67f63aab94fa733a151d29f7db460e7c2f61f396d2c989dd1dfc7252' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261113-manutencao-preventiva-sistema', intent_id: 'buyer-preventive-maintenance-plan-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/manutencao-preventiva-sistema-mtbf-mttr-aceite/`,
    digest: '70a3c1a6083a6f8e3e24a8f7729a7bebf9934de61958c231233ded61318c809d', digestScope: 'file',
    assets: [
      { path: 'torno-preventiva-horimetro-calendario.svg', digest: '2e1c63ab128758f21c4daa334db1f276a461a3c7825d7d1d26255374bd751f01' },
      { path: 'torno-preventiva-linha-tempo-mtbf.svg', digest: '3ee2717989503dcad87577e5d802d027e1836bccf203ed8a64ba3970338dff1d' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261116-nao-conformidade-sistema', intent_id: 'buyer-nonconformity-corrective-action-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/nao-conformidade-rnc-sistema-acao-corretiva-aceite/`,
    digest: '8f1e9140350faaa5206842a9aa443dfc4f343d31f842c2fc1c920f457f3ebb4b', digestScope: 'file',
    assets: [
      { path: 'torno-rnc-etiqueta-segregado.svg', digest: 'daec8a995ccae07206cc422fe4bde58f32119728daf6b70aa5813740f6d84bd8' },
      { path: 'torno-rnc-carimbos-disposicao.svg', digest: '00fa0ab61055ab852aeca86787c773ea0a33cf9e12f0560afd99702baaf82e4b' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261116-estrutura-produto-bom', intent_id: 'buyer-bill-of-materials-product-structure-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/estrutura-produto-bom-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/estrutura-produto-bom-sistema-aceite/`,
    digest: '2410a79d390863c7997d5384181dd7d23a83e427c1b51d467272a8b09eb176ae', digestScope: 'file',
    assets: [
      { path: 'torno-bom-vista-explodida-baloes.svg', digest: '44d2df1490e80d35dcd193bf3edfd15037bdd757a8ca121ba357499015a034b2' },
      { path: 'torno-bom-regua-revisoes-op.svg', digest: '61e5957f3f480f3533cba3585894fa6f4a24ed855e556e51da6ad31fb14fb4be' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261116-mrp-necessidade-materiais', intent_id: 'buyer-mrp-material-requirements-planning-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/mrp-calculo-necessidade-materiais-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/mrp-calculo-necessidade-materiais-sistema-aceite/`,
    digest: 'b846764710fa74688c224913e4a60d1808ce038d7b473dba0ef98909d744a954', digestScope: 'file',
    assets: [
      { path: 'torno-mrp-registro-caderno.svg', digest: '2f36216830774ecc9f8d76ceb4c9601ea55d56f9d618b07fe9c52f0ceae13127' },
      { path: 'torno-mrp-serrote-estoque-projetado.svg', digest: 'c398683b65aa2952a6896037208e075ad21f4a5fbf85f0ea5bf03bcfa705bb2e' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261117-programacao-producao', intent_id: 'buyer-production-scheduling-finite-capacity-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/programacao-producao-sequenciamento-capacidade-sistema-aceite/`,
    digest: '3762833fbb8912e2c330e2ff71db49afce1c2dcd9d42726dfa3b4d1b44516ed4', digestScope: 'file',
    assets: [
      { path: 'torno-programacao-quadro-magnetico.svg', digest: 'a30944ee1fe0c64216aecec3753173f9c52d502ed224907ec2f62cf134db1a4c' },
      { path: 'torno-programacao-trem-setups.svg', digest: '7ab2dc336ce4b6d1d906b6d440f93f8f05a28b0bd48c853f2938e4413f055bf0' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261117-industrializacao-terceiros', intent_id: 'buyer-subcontracting-third-party-processing-stock-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/industrializacao-terceiros-remessa-retorno-sistema-aceite/`,
    digest: 'e4814dbdc3b15f0e55c5b2257aa844a1c1900c1ff42106c67923b0414ce32167', digestScope: 'file',
    assets: [
      { path: 'torno-industrializacao-extrato-terceiros.svg', digest: '3ebb7c3e907a4b34eae43f1108cc6bf362c214a2f994d38bd31a807147d34646' },
      { path: 'torno-industrializacao-rota-balanca.svg', digest: '7e77a01456047a8f24c8c09ec72810074a663746c1700a3f2630407bebb2c6dd' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261117-orcamento-usinagem', intent_id: 'buyer-job-shop-quote-costing-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/orcamento-usinagem-cotacao-pecas-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/orcamento-usinagem-cotacao-pecas-sistema-aceite/`,
    digest: '08416c1d2a2317e96a194db6f59aeb33a925890926392def4721b8d90543be21', digestScope: 'file',
    assets: [
      { path: 'torno-orcamento-barra-cortes.svg', digest: '8e039a34bb15ab1f3fb6de1e3d3564c55c0475fc6424f75458768f235535abc3' },
      { path: 'torno-orcamento-preco-quantidade.svg', digest: 'c114fa0ec831f43694197ae4027cfb38009788fdac429159092f98aa2f1b2722' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261118-calibracao-instrumentos', intent_id: 'buyer-measuring-instrument-calibration-control-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/calibracao-instrumentos-medicao-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/calibracao-instrumentos-medicao-sistema-aceite/`,
    digest: 'da8cd73ed0336f5848f6bec589c6b792429c07682e93c54761184c04fd08345e', digestScope: 'file',
    assets: [
      { path: 'torno-calibracao-faixa-ema.svg', digest: '2b73af79134381d033e969cad1135c0ed89d55583115d970f29fbdcbc060ffc8' },
      { path: 'torno-calibracao-janela-impacto.svg', digest: '731761b9c5021ac0b7d44c90ac0ee5ae087f912e0c17de516d7ba9b3d56f775a' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261118-inspecao-recebimento', intent_id: 'buyer-receiving-inspection-sampling-plan-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/inspecao-recebimento-amostragem-nqa-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/inspecao-recebimento-amostragem-nqa-sistema-aceite/`,
    digest: 'ef4cfb700aadd26f8c4d3330bbce2a1df6de389bc212c7ca1e2ab5b875538ba1', digestScope: 'file',
    assets: [
      { path: 'torno-inspecao-grade-amostra.svg', digest: '324d060495ac9896dd759d886b4a4952fa2a802695c9456ac9a18fce0455ec5e' },
      { path: 'torno-inspecao-chave-regimes.svg', digest: 'af41e3a4208b8aa0c6f919d345a99e9073f96ac201685888340cc9d4613d16ca' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261118-kanban-producao', intent_id: 'buyer-kanban-pull-replenishment-cards-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/kanban-producao-cartoes-reposicao-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/kanban-producao-cartoes-reposicao-sistema-aceite/`,
    digest: 'd312ad91029378ee26423b63972f2b24b4370d28f4d6de301799c221d4cd5b55', digestScope: 'file',
    assets: [
      { path: 'torno-kanban-planta-circuitos.svg', digest: 'b6416793277f540da927ad7a68e3999b29c43a962389aab5c34fbcbaa86501b0' },
      { path: 'torno-kanban-cartao-substituido.svg', digest: '262a5f19a98ef2b9fef0365929459e96465c6531e94f85a871517925d43d7f62' },
      { path: 'torno-kanban-quadro-redimensionamento.svg', digest: '2f1c2e2367e22f486ad073392f59398f0038a9934796e747b619a4bcb43edc13' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261119-cep-cartas-controle', intent_id: 'buyer-spc-control-charts-capability-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/cep-controle-estatistico-processo-cartas-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/cep-controle-estatistico-processo-cartas-sistema-aceite/`,
    digest: '0ff9eb020e15f51c2dcf7f5dc5c1d7cb6ae11bdbc1161fa0543027e528100391', digestScope: 'file',
    assets: [
      { path: 'torno-cep-carta-xbar-r.svg', digest: '6c655791f0336e6d35887fc13586534d6172b6d12581cddc8b497a53b1789e18' },
      { path: 'torno-cep-duas-reguas.svg', digest: 'b22caa303a28376f194f0572c4a46657f8a5f0ab66c2612e3113c4983e91c09e' },
      { path: 'torno-cep-registro-reacao.svg', digest: 'd1eb207c0fbd93bb50448c20d56d1f4a86cab5e3f6543742bb7fe10491e056ba' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261119-custo-producao', intent_id: 'buyer-production-costing-standard-actual-variance-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/custo-producao-padrao-real-rateio-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/custo-producao-padrao-real-rateio-sistema-aceite/`,
    digest: '0ca73dd38076983f1409277f26d7566f993ac66feaf774a65af42ce56f370da8', digestScope: 'file',
    assets: [
      { path: 'torno-custo-cascata-variacoes.svg', digest: '98d77d8938ebcf4bdf1e728c4d89fa14c1c8a8598d47ddad549cbca9aac4cf36' },
      { path: 'torno-custo-balde-capacidade.svg', digest: '15b9858e2324617d0427268331a19e0cf261c597c791f14af8dcabf0f7922709' },
      { path: 'torno-custo-ordem-corte.svg', digest: 'dd9c08bbb5dee7e49c0c86d85c2478d6dc42f57da473fd1e234dd3f757dde177' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261119-avaliacao-fornecedores', intent_id: 'buyer-supplier-qualification-performance-rating-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/avaliacao-fornecedores-iqf-homologacao-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/avaliacao-fornecedores-iqf-homologacao-sistema-aceite/`,
    digest: '6c89223de1328a30c05aea8cb45bde8093ed50f7248e06ba8f5d75084f9567ae', digestScope: 'file',
    assets: [
      { path: 'torno-fornecedores-boletim-iqf.svg', digest: 'bd16174a45e5ec07b962522e53ac81ebd9790504794681658636cfbeabae16bc' },
      { path: 'torno-fornecedores-validade-documentos.svg', digest: 'b3fe2af751ae29fd0eba3b41d9d0b19923df0de33ecb6f135b59e012ad7d0cf4' },
      { path: 'torno-fornecedores-semaforo-situacoes.svg', digest: '651cf91d4442f212cff630c40312161a196f2c9cc77129fff4172265c9a86762' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261120-apontamento-producao', intent_id: 'buyer-shop-floor-production-reporting-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/apontamento-producao-chao-fabrica-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/apontamento-producao-chao-fabrica-sistema-aceite/`,
    digest: '15d3d2b0e3993488084ee86239c1b7274dbbaa78067efe40f5ed759d885e8403', digestScope: 'file',
    assets: [
      { path: 'torno-apontamento-regua-turno.svg', digest: 'b31a347ba8ef8b301ae7f26e171f9c886cd78a76067e620022b07773f4ea43ea' },
      { path: 'torno-apontamento-razao-pecas.svg', digest: '67794dc8a93a92ed55cd9ef3cb46f35f73ccb6392def89a8066cb0f759a6694a' },
      { path: 'torno-apontamento-pilhas-consumo.svg', digest: '0ab47853113d7a019dd2c6cf7a1ebe3bd82d962a57422892841b5789c6560771' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261120-regua-cobranca', intent_id: 'buyer-receivables-dunning-collection-rules-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/regua-cobranca-inadimplencia-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/regua-cobranca-inadimplencia-sistema-aceite/`,
    digest: '34c8a2ee3bde6eb256fc18d4699f108f3358d0cc81acf459da4bae7cf7d4edda', digestScope: 'file',
    assets: [
      { path: 'torno-cobranca-mostrador-regua.svg', digest: '3c9dadca5ac44eb943e53cc8614037189ca5244e06dc5f6c614dadabaa8e1c94' },
      { path: 'torno-cobranca-interruptores.svg', digest: '8a4141cc3609c0f49dd2a8f9995ff683addc08a0ae0ff5ccb41679b6007a4eec' },
      { path: 'torno-cobranca-titulo-corte.svg', digest: '77dc3fc34b07e20b25a785ebb5e641af84591080cda26f267a88bada31c7ec93' },
      { path: 'torno-cobranca-escada-decisao.svg', digest: '99e7b11b05f90f05120cc7913ed9ce315b84e821f3715655a98cdf003fe9f669' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261120-reajuste-contratos', intent_id: 'buyer-recurring-contract-index-adjustment-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/reajuste-contratos-indice-ipca-igpm-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/reajuste-contratos-indice-ipca-igpm-sistema-aceite/`,
    digest: '0d62f4a1b9292d1fa44d5c4b8d15693915db7918e1a9e4ba46b8e1c42322fbe0', digestScope: 'file',
    assets: [
      { path: 'torno-reajuste-ampulheta-defasagem.svg', digest: '5a30b7aea6f21601bdd92fcc9441c8b51ccb53afe0557d9416fc2bd2b986f6ff' },
      { path: 'torno-reajuste-conta-certo-errado.svg', digest: 'b747290d9eaeaf9c1280657418538aa1b4cf926b18fcdf860ad55b01e785753e' },
      { path: 'torno-reajuste-calendario-aniversarios.svg', digest: '72b3a5f434a95d522c67c43362229294dfa09dae19cf00be91b97c87be75e52d' },
      { path: 'torno-reajuste-indice-negativo-trilhos.svg', digest: 'a8c279fbd2f1aac58b11311a8c1fffab99b7c1645ca62034a89f6ae35cc66d09' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261123-conferencia-nfe-pedido', intent_id: 'buyer-purchase-invoice-three-way-match-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/conferencia-nfe-entrada-pedido-compra-sistema-aceite/`,
    digest: '086a724624e7ac5f8d6b81184e475f5c5d3b6f5c52734eeed1ad3021df9afeae', digestScope: 'file',
    assets: [
      { path: 'torno-conferencia-tres-vias-sobrepostas.svg', digest: 'd849cc8886cd8c978320c3fca2010cdcf802a813faae469ff09e6df7c26622a2' },
      { path: 'torno-conferencia-balanca-quantidade.svg', digest: '962d41f40ab1dd3d37af7b4bbb84da82c8bff9b090e2c180d102cc34a8b7742d' },
      { path: 'torno-conferencia-matriz-tolerancias.svg', digest: '90bc65445b719627d9575b5e823cd389e9c93ecf55e4bed204d784c9ac83eaa1' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261123-separacao-pedidos-expedicao', intent_id: 'buyer-order-picking-packing-shipping-check-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/separacao-pedidos-conferencia-expedicao-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/separacao-pedidos-conferencia-expedicao-sistema-aceite/`,
    digest: '7dec6c31f0fbc649102035ddb2b29fa607188d334ef3839c02268c808453c0fd', digestScope: 'file',
    assets: [
      { path: 'torno-separacao-planta-rota.svg', digest: 'aca05a149fc508b6633062fe6b03ebef700f013fe63ea917169e70949cde8f5c' },
      { path: 'torno-separacao-raio-x-volume.svg', digest: '4c2162536819222f90bb97b1c010c7d4214dfe39100ff1990993a3ea78ce6cb3' },
      { path: 'torno-separacao-docas-romaneio.svg', digest: '890884d8ce37c241f144208cb03c5996d23ef726eb726285923aa9d0de99b698' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261123-boleto-registro-remessa-retorno', intent_id: 'buyer-boleto-issuance-cnab-remittance-return-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/boleto-sistema-remessa-retorno-cnab-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/boleto-sistema-remessa-retorno-cnab-aceite/`,
    digest: 'c4a723fd4f02d02205ad9730c09e7c4afdb83ef355c45065ce270f6ce5c6227e', digestScope: 'file',
    assets: [
      { path: 'torno-boleto-anatomia.svg', digest: '4a8e3b5d06eb07b1dd2c1e3485021cea39b7f7e83a388bf8a76c5f5496e15f41' },
      { path: 'torno-boleto-matriz-retorno.svg', digest: '4791c54d93db7140664359ab77e0a7aa06fc339596cb9d2f41d8104067712412' },
      { path: 'torno-boleto-trilhos-titulo.svg', digest: '7c46427b0b371d4d4be00d7e95f4bb4378b18973372d02d88c783afbc3a3d661' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261124-certificado-digital-a1-sistema', intent_id: 'buyer-digital-certificate-a1-expiry-renewal-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/certificado-digital-a1-vencimento-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/certificado-digital-a1-vencimento-sistema-aceite/`,
    digest: '30b5fdbe852d29df418e7c5db2f1dcec508620a693bab3f8407bc0d909fb032c', digestScope: 'file',
    assets: [
      { path: 'torno-certificado-cofre-chaveiro.svg', digest: 'a73fe3cc8193eed8c6042ea7a8af3f78a75c4f648f09a759121532f06ac21f50' },
      { path: 'torno-certificado-arvore-falha.svg', digest: '06efb84e8f672c46dde5bda7d5d9c4c74acb234d122cb8a837de70173c5e5dc8' },
      { path: 'torno-certificado-linha-validade.svg', digest: 'cb2376c098e69d1a026fccd96568b5fbe45ae6e09f44435f2c2b15caee6b402e' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261124-ordem-servico-assistencia-tecnica', intent_id: 'buyer-service-order-field-service-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/ordem-servico-assistencia-tecnica-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/ordem-servico-assistencia-tecnica-sistema-aceite/`,
    digest: '94d4497e8916b41fe55622641774d98be0420dd21c35b0e0113d915bfb6a1176', digestScope: 'file',
    assets: [
      { path: 'torno-os-anatomia-ordem.svg', digest: 'ceff0b6450239d364064d2222f2e65c856f2b086f5ee09194717870a1859ac24' },
      { path: 'torno-os-mapa-dia-tecnico.svg', digest: '68da08e2c605937ca124998eee87496942fdcdb9db1fae8a088c6980e91228bb' },
      { path: 'torno-os-relogio-garantia.svg', digest: '4e6ff76a64cf997e4b8fa8dd1586b60d8fcae9da014e3c9d89e4537fa11ba7d1' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261124-requisicao-cotacao-compras', intent_id: 'buyer-purchase-requisition-quotation-po-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/requisicao-cotacao-pedido-compra-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/requisicao-cotacao-pedido-compra-sistema-aceite/`,
    digest: '2505dd6d9b518ede387f98e35b661efb82fdc67b2a02219f1308ae3c588efd8e', digestScope: 'file',
    assets: [
      { path: 'torno-compras-envelopes-abertura.svg', digest: '00c41eac9c69b74b9f3c3770c7a4757d4ba69d73d41fb00e5f68ef215d32cb9a' },
      { path: 'torno-compras-balanca-propostas.svg', digest: '0f9bf3698de10da804765bd11d1dab5307ceab6cc0b2045191527d1ee11fc77d' },
      { path: 'torno-compras-escada-alcadas.svg', digest: '6f2b68230940a7b102cb475f4a5367bcf58d503e57e075d4e83549dd7d3361ee' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261125-controle-epi-ficha-entrega', intent_id: 'buyer-ppe-control-delivery-record-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/controle-epi-ficha-entrega-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/controle-epi-ficha-entrega-sistema-aceite/`,
    digest: 'a8c86384191d0858f15c1965554d627a09810a1f246f4b1695c4fb69a6d85848', digestScope: 'file',
    assets: [
      { path: 'torno-epi-recibo-entrega.svg', digest: '33eebba126fd023063d45a136db5d9385c9e0e96d0662815921985a6edfff3aa' },
      { path: 'torno-epi-silhueta-mudanca-funcao.svg', digest: '6f8525aee0891ba65c22e0460c486376416e05c8c60067b3f0d8cbbcf825ab83' },
      { path: 'torno-epi-escaninhos-tamanhos.svg', digest: '39e7409470cacdf54e016eaefee33b23dd38d8ca7545869a6d6848dd0e93f013' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261125-gestao-frota-veiculos', intent_id: 'buyer-fleet-management-fuel-fines-documents-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/gestao-frota-abastecimento-multas-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/gestao-frota-abastecimento-multas-sistema-aceite/`,
    digest: 'cb918f3a97bfdaf160bb3931b45d30e05a0f1e0951f0346b5a66f476a5043a16', digestScope: 'file',
    assets: [
      { path: 'torno-frota-envelope-prazo.svg', digest: '8f0cbd6ccc3c0b42709690e6adc15dcb081adb392bd857128f5b87a040115fa1' },
      { path: 'torno-frota-bomba-consumo.svg', digest: 'd8dd900d5729595662a909154d54f6cc5b2b495b881dc8102c32cb33e94fb14d' },
      { path: 'torno-frota-parabrisa-documentos.svg', digest: '18504001386ccea90f9da4b0e3475a99148175e5f60286a851521c78612fc3ca' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261125-ponto-eletronico-rep-p', intent_id: 'buyer-electronic-time-clock-rep-p-portaria-671-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/ponto-eletronico-rep-p-portaria-671-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/ponto-eletronico-rep-p-portaria-671-sistema-aceite/`,
    digest: '8e252e611653aa7c8cb35b6ca1d5bdc4cde30a2514d82b5a63fbd593596cf9f3', digestScope: 'file',
    assets: [
      { path: 'torno-ponto-fita-tratamento.svg', digest: 'a16971334c5f8f7d9546c8ef3d966a617b9946305ccff97ac2121b77c67dc0b3' },
      { path: 'torno-ponto-cartao-semana.svg', digest: '34e5bd904323f09a8d931c0f90cac8250ac6a744d454b3aaa2163c9c9e48ff31' },
      { path: 'torno-ponto-raio-geolocalizacao.svg', digest: '1f296316254720a2eb0420b76d6d13a8e0157e35f8bc2ddadeb89b1e20f1c9e1' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261126-controle-patrimonial-ativo-imobilizado', intent_id: 'buyer-fixed-asset-control-tagging-depreciation-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/controle-patrimonial-ativo-imobilizado-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/controle-patrimonial-ativo-imobilizado-sistema-aceite/`,
    digest: '93d5a9e1a8c5ce0204971c2307d1dace93942e0a8b667d152cb2af619849cfb9', digestScope: 'file',
    assets: [
      { path: 'torno-patrimonio-grafico-contabil-fiscal.svg', digest: '116de0c8960316b4740a6f64ec4f70616cdb9ad034f8aa48d54f2d9dfbddb512' },
      { path: 'torno-patrimonio-planta-inventario.svg', digest: '7ab989fad59c1c07ca2aff97ad46f85374124fcc4bbd357e6e9e3beb444ef665' },
      { path: 'torno-patrimonio-plaqueta-ficha-vida.svg', digest: '40924ce259e9a3e945c6b8c9151c902a8f4792bdcac758322c7a96e56590a8d0' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261126-controle-ferias-sistema', intent_id: 'buyer-vacation-control-hr-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/controle-ferias-periodo-aquisitivo-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/controle-ferias-periodo-aquisitivo-sistema-aceite/`,
    digest: '8b110922dd06963792a13091d7bde05bb12c1e3cf15d873cba4a49d2c93e4d94', digestScope: 'file',
    assets: [
      { path: 'torno-ferias-regua-dois-anos.svg', digest: 'a4507effbfd1145fffc61c1acf04a9117a14b39123fe3f53bb41cb1effa90186' },
      { path: 'torno-ferias-calendario-abril-2027.svg', digest: '16f38565f97a8f686e4325b45adc1fb468aee222b697b276759ea57de1813c50' },
      { path: 'torno-ferias-quebra-cabeca-dias.svg', digest: 'e1402c170e012073bb3a0db04e08b9419ed904c88fc5a66419fe573cde9032dd' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261126-reembolso-despesas-sistema', intent_id: 'buyer-employee-expense-reimbursement-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/reembolso-despesas-funcionarios-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/reembolso-despesas-funcionarios-sistema-aceite/`,
    digest: 'd892bcd0799f50fc51b25c2d9b09a6688caf193dda07be1911e3606bf508c7c6', digestScope: 'file',
    assets: [
      { path: 'torno-reembolso-balanca-adiantamento.svg', digest: '44822dcc14ce3f054edc949545717abf0052d74f8cb455eb7f39e5d7150616ee' },
      { path: 'torno-reembolso-cupom-anotado.svg', digest: 'db681de631c151871c3b3e790c614ecd0c26836a9c54a224dba8942d10674d8b' },
      { path: 'torno-reembolso-mapa-quilometragem.svg', digest: '1671ff126db924c1c8a8000ea5bb2d27e0c6119bce32efb19d245c7ced2316e8' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261127-controle-treinamentos-nr-sistema', intent_id: 'buyer-nr-training-matrix-validity-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/controle-treinamentos-nr-validade-reciclagem-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/controle-treinamentos-nr-validade-reciclagem-sistema-aceite/`,
    digest: 'db689256f21024bb6796f691fb658d65fc9e103867c9e114b65f16e7130bdc4c', digestScope: 'file',
    assets: [
      { path: 'torno-treinamentos-matriz-calor.svg', digest: '92da1e222cb8102336c5e6a2ee46037caa8402f7692c0deb47baf1b0e5b41f5f' },
      { path: 'torno-treinamentos-semaforo-escala.svg', digest: '92361721c04108a3e9699c96fe658d66b82beb338fa2f24fa6fead5ba91c157a' },
      { path: 'torno-treinamentos-cracha-habilitacoes.svg', digest: '8c9b21af3c193d0f8bf1f9354ea15ec78594b3e62e4e700d8523a48231adbaff' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261127-controle-documentos-sistema', intent_id: 'buyer-document-control-quality-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/controle-documentos-qualidade-lista-mestra-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/controle-documentos-qualidade-lista-mestra-sistema-aceite/`,
    digest: 'd6d256d35cab29d954208e975edc251e3445c5f01b3184a33988dcc24532d8fe', digestScope: 'file',
    assets: [
      { path: 'torno-documentos-arvore-revisoes.svg', digest: 'b16a992171c05ff9d5f4ed0d9df0d05b86425767df073605b57ce724f8113ebf' },
      { path: 'torno-documentos-carimbos-copias.svg', digest: 'c950e7febe787662cdd7d7e6dfacee014ff6b19d56cf7d4f29226c280a12460d' },
      { path: 'torno-documentos-gaveteiro-estados.svg', digest: '9384110c46488e4e5d2218b1a1148445b08e7bb61748256a3081e87ecea8337c' },
    ],
  },
  {
    content_id: 'torno-artigo-pt-20261127-gestao-contratos-vencimento', intent_id: 'buyer-contract-management-expiry-renewal-system-acceptance-pt', locale: 'pt-BR',
    path: '/blog/gestao-contratos-vencimento-renovacao-sistema-aceite/', canonical_url: `${BLOG_ORIGIN}/blog/gestao-contratos-vencimento-renovacao-sistema-aceite/`,
    digest: '8fe8a6e495f26b1aa6e3ef6723cd689a9eda2023f81db948d7dcb1c9f66b04bc', digestScope: 'file',
    assets: [
      { path: 'torno-contratos-trilho-renovacao.svg', digest: '2dc7f64787ce103f067007a889fabd607b5da6c43207b70e74edd7f4c05e0470' },
      { path: 'torno-contratos-despertadores-aviso.svg', digest: '6dc70125ebc119681fe040d24d97081afbf0be0a050dc5e0a64bbf4855fb33f5' },
      { path: 'torno-contratos-pasta-sanfonada.svg', digest: '83c50adb7f76a15878bddb8af2cd8a64d88fcb839af903b6e8a6b3ee18dfd772' },
    ],
  },
];
export const sha256 = value => createHash('sha256').update(value).digest('hex');
const fail = message => { throw new Error(`[blog] ${message}`); };
const text = value => typeof value === 'string' && value.trim().length > 0;
export function timestamp(value, label) {
  if (!text(value) || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) fail(`${label}: ISO timestamp with timezone required`);
  const day = value.slice(0,10);
  if (new Date(`${day}T00:00:00Z`).toISOString().slice(0,10) !== day || !Number.isFinite(Date.parse(value))) fail(`${label}: invalid date`);
  return Date.parse(value);
}
export function validateRecord(data, body, buildAt, releaseApproval = null) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) fail('frontmatter object required');
  const d = data;
  for (const key of ['content_id','intent_id','locale','type','status']) if (!text(d[key])) fail(`${key} required`);
  if (!['pt-BR','en'].includes(d.locale) || d.type !== 'artigo' || !BLOG_STATES.includes(d.status)) fail(`${d.content_id}: invalid locale/type/state`);
  const now = timestamp(buildAt,'buildAt');
  for (const key of ['created_at','reviewed_at','verified_at','first_published_at','last_substantive_update_at','release_approved_at']) {
    if (d[key] != null) timestamp(d[key],key);
  }
  for (const key of ['created_at','reviewed_at','verified_at','release_approved_at']) if (d[key] != null && Date.parse(d[key]) > now) fail(`${key}: future observation`);
  if (d.last_substantive_update_at != null && (!d.first_published_at || Date.parse(d.last_substantive_update_at) <= Date.parse(d.first_published_at))) fail('update requires later substantive date');
  const isCandidate = ['approved','published'].includes(d.status);
  if (!isCandidate) return false;
  if (d.status === 'approved' && !releaseApproval) return false;
  for (const key of ['working_title','h1','summary','primary_question','proposed_path','canonical_url','url_owner','audience','buyer_stage','scope','not_scope','reviewer','reviewed_at','release_approved_by','release_approved_at','release_approval_evidence']) if (!text(d[key])) fail(`${d.content_id}: ${key} required for release`);
  const authorName=text(d.author_name); const authorBasis=text(d.author_basis);
  if (authorName !== authorBasis || (d.author_name != null && !authorName) || (d.author_basis != null && !authorBasis)) fail(`${d.content_id}: author fields must both be absent/null or verified together`);
  if (!text(body)) fail('body required for release');
  if (reserved.has(d.intent_id)) fail(`reserved intention: ${d.intent_id}`);
  const prefix = blogIndexPath(d.locale);
  if (!d.proposed_path.startsWith(prefix) || !/^[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(d.proposed_path.slice(prefix.length))) fail('invalid blog path');
  const slug = d.proposed_path.slice(prefix.length,-1);
  if (blockedSlugs.has(slug)) fail(`no_go slug: ${slug}; reapproval must update the registry explicitly`);
  if (d.canonical_url !== BLOG_ORIGIN + d.proposed_path) fail('canonical must use final origin and exact path');
  if (!Array.isArray(d.claims_and_sources) || !Array.isArray(d.internal_links)) fail('sources and internal_links arrays required');
  for (const source of d.claims_and_sources) {
    if (!source || !['FATO','ESTIMATIVA','HIPÓTESE'].includes(source.classification) || !text(source.claim) || !text(source.reference) || !text(source.entity) || !text(source.limit)) fail('invalid claim/source');
    if (source.checked_at != null) { timestamp(source.checked_at,'source.checked_at'); if (Date.parse(source.checked_at)>now) fail('future source check'); }
    else if (/^https?:\/\//i.test(source.reference)) fail('external source requires checked_at');
  }
  for (const link of d.internal_links) if (!link || !text(link.path) || !text(link.reason)) fail('internal link requires path/reason');
  if (d.status === 'published') {
    if (!d.verified_at || !d.evidence_of_publication || typeof d.evidence_of_publication !== 'object') fail('published requires public evidence and verified_at');
    const e=d.evidence_of_publication;
    if (e.url !== d.canonical_url || e.canonical !== d.canonical_url || e.http_status !== 200 || e.noindex !== false || !text(e.artifact)) fail('invalid publication evidence');
  }
  // Unknown publication time stays null. A known future date never creates a route.
  if ([d.first_published_at,d.last_substantive_update_at].some(v=>v != null && Date.parse(v)>now)) return false;
  return true;
}
async function markdownFiles(dir) {
  try { await stat(dir); } catch (e) { if(e.code==='ENOENT')return []; throw e; }
  const out=[];
  for(const entry of await readdir(dir,{withFileTypes:true})) {
    if(entry.isSymbolicLink()) fail('content symlinks are forbidden');
    const file=path.join(dir,entry.name);
    if(entry.isDirectory()) out.push(...await markdownFiles(file));
    else if(entry.isFile() && entry.name.endsWith('.md'))out.push(file);
  }
  return out.sort();
}
export async function prepareBlogManifest(root, buildAt) {
  const source=path.join(root,'src/content/blog');
  // Current author attestation is separate from immutable historical release receipts.
  const authorship=JSON.parse(await readFile(path.join(root,'src/config/blog-authorship.json'),'utf8'));
  const authoredIds=new Set(authorship.contentIds);
  let approvals={entries:[]};
  try { approvals=JSON.parse(await readFile(path.join(root,'src/config/blog-release-approval.json'),'utf8')); }
  catch(e) {
    if(e.code!=='ENOENT')throw e;
    // Isolated QA fixtures may supply their own temporary approval file.
    try { approvals=JSON.parse(await readFile(path.join(root,'.astro/blog-release-approval.json'),'utf8')); }
    catch(fallbackError) { if(fallbackError.code!=='ENOENT')throw fallbackError; }
  }
  if(!Array.isArray(approvals.entries))fail('invalid release approval manifest');
  let privateFixture=false;
  try { await stat(path.join(root,'PRIVATE_FIXTURE_DO_NOT_DEPLOY')); privateFixture=true; } catch(e) { if(e.code!=='ENOENT')throw e; }
  const entries=[];const ids=new Set();const paths=new Set();const intents=new Set();
  const sourceHashes={};
  for(const file of await markdownFiles(source)) {
    const raw=await readFile(file,'utf8');
    const match=raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
    if(!match)fail(`frontmatter missing: ${file}`);
    const d=await maintenanceOverlay(root,file,raw,parse(match[1],{uniqueKeys:true}));
    const approval=approvals.entries.find(a=>a.contentId===d.content_id && a.locale===d.locale);
    const sourceHash=sha256(raw);
    const bodyHash=sha256(match[2]);
    const allowed=RELEASE_ALLOWLIST.find(row=>row.content_id===d.content_id);
    const releaseDigest=allowed?.digestScope==='body'?bodyHash:sourceHash;
    if (!privateFixture && (d.status==='approved' || d.status==='published' || approval)) {
      if (!allowed || d.intent_id!==allowed.intent_id || d.locale!==allowed.locale || d.proposed_path!==allowed.path || d.canonical_url!==allowed.canonical_url || releaseDigest!==allowed.digest) fail('article outside the exact release allowlist');
    }
    if(approval && (approval.contentRevision!==releaseDigest || approval.path!==d.proposed_path || approval.contentId!==d.content_id || approval.intentId!==d.intent_id || !text(approval.approvedBy) || !text(approval.approvedAt)))fail('release approval hash/path mismatch');
    if(approval && !privateFixture && d.content_id==='torno-artigo-pt-20261014-planilhas' && (approval.reviewedBy!=='Verso' || approval.reviewedAt!=='2026-10-14T21:33:40Z' || approval.approvedBy!=='Henrique' || approval.approvedAt!=='2026-10-14T21:28:02Z' || approval.authorizationEvidence?.operational?.authorizedBy!=='Henrique' || approval.authorizationEvidence?.operational?.authorizedAt!=='2026-10-14T21:28:02Z' || approval.authorizationEvidence?.operational?.instruction!=='documente a decisão de release como autorização de Henrique 21:28:02Z vinculada ao hash Verso' || approval.authorizationEvidence?.business?.owner!=='Trilha' || approval.authorizationEvidence?.business?.recordedAt!=='2026-10-14T21:28:02Z' || approval.authorizationEvidence?.editorial?.reviewer!=='Verso' || approval.authorizationEvidence?.editorial?.reviewedAt!=='2026-10-14T21:33:40Z' || approval.authorizationEvidence?.editorial?.sha256!==releaseDigest))fail('release approval provenance mismatch');
    if(approval && !privateFixture && d.content_id==='torno-artigo-pt-20261015-criterios-aceite-mvp') {
      const ev=approval.authorizationEvidence??{};const prov=ev.authorization_provenance??{};const metadata=approval.metadata??{};const addendum=approval.metadataAddendum??{};
      const approvedFiles=[{path:'torno-criterios-aceite-mvp.md',sha256:releaseDigest},{path:'torno.svg',sha256:allowed.asset.digest}];
      if(d.seo_title!=='Critérios de aceite para MVP: guia para contratar | Torno' || d.seo_description!=='Defina critérios de aceite antes de contratar um MVP. Veja exemplos, uma ficha de escopo e como validar integrações sem depender de promessas vagas.' || metadata.title!==d.seo_title || metadata.description!==d.seo_description || approval.approvedBy!=='Farol (delegado operacional)' || approval.approvedAt!=='2026-10-15T12:35:03Z' || approval.reviewedBy!=='Verso' || approval.reviewedAt!=='2026-10-15T12:34:07Z' || approval.approvalScope!=='Somente Markdown e SVG entram no artefato; PNGs não entram no runtime público.' || ev.related_evidence?.verso_review!=='PASS factual/editorial claim-by-claim on saved bytes at 2026-10-15T12:34:07Z for body SHA-256 '+releaseDigest || prov.standing_authorization?.authorized_by!=='Henrique' || prov.standing_authorization?.authorized_date!=='2026-10-14' || prov.specific_operational_delegation?.authorized_by!=='Henrique' || prov.specific_operational_delegation?.authorized_at_utc!=='2026-10-15T11:24:34Z' || prov.prior_delegated_release_approval?.approved_at_utc!=='2026-10-15T11:36:05Z' || prov.current_delegated_release_approval?.approved_by!=='Farol (delegado operacional)' || prov.current_delegated_release_approval?.approved_at_utc!=='2026-10-15T12:35:03Z' || prov.editorial_review_by_henrique!==false || prov.personal_hash_approval_by_henrique!==false || addendum.sha256!=='ec2c57444bc88cf22fc251c98c1c48da3333686ea4b13005526e90df6c8df939' || addendum.recordedAt!=='2026-10-15T12:35:03Z' || addendum.seo_title!==d.seo_title || addendum.seo_description!==d.seo_description || approval.sources?.historySha256!=='16ce0a52c466e8f33a454317103d93289b5e8fa9e77f57c326e462aecf3cf5b9' || approval.sources?.releaseAddendumV3Sha256!==addendum.sha256 || approval.sources?.previousMetadataAddendumSha256!=='8fdabafcadec3fd2b74f468db58592d9a86464e8d3aa985259de1b944080e82a' || approval.sources?.previousReleaseReceiptSha256!=='fc4d6924b7494f80393eb2f5eedaf2449f089512f7c5813e1f90ecd899af83b9' || ev.release_addendum_v3?.sha256!==addendum.sha256 || JSON.stringify(approval.assets)!==JSON.stringify([{path:'torno.svg',sha256:allowed.asset.digest}]) || JSON.stringify(approval.approvedFiles)!==JSON.stringify(approvedFiles) || JSON.stringify(approval.excludedAssets)!==JSON.stringify(['torno.png','torno-360.png'])) fail('new article approval metadata/provenance/asset scope mismatch');
      if(sha256(await readFile(path.join(root,'src/content/blog','torno.svg')))!==allowed.asset.digest)fail('approved SVG asset hash mismatch');
    }
    if(approval && !privateFixture && d.content_id==='torno-artigo-pt-20261015-integracao-erp-briefing') {
      const expectedReceipt='3ee53dbabb278cd403ff0c13098bc2a51d1a218f9661e4cc294ca932256e086d';
      const expectedTitle='Integração com ERP: briefing para orçamento | Torno';
      const expectedDescription='Veja quais dados, documentos, acessos e responsáveis reunir antes de pedir orçamento de integração com ERP. Um roteiro para explicitar dependências.';
      const expectedH1='Integração com ERP: o que reunir antes de pedir orçamento';
      const expectedAssets=allowed.assets.map(a=>({path:a.path,sha256:a.digest}));
      const expectedFiles=[{path:'integracao-erp-briefing-final.md',sha256:releaseDigest},...expectedAssets];
      const ev=approval.authorizationEvidence??{};const prov=ev.authorizationProvenance??{};
      if(d.h1!==expectedH1||d.seo_title!==expectedTitle||d.seo_description!==expectedDescription||approval.contentRevision!==allowed.digest||approval.approvedBy!=='Farol (delegado operacional)'||approval.approvedAt!=='2026-10-15T16:30:30Z'||approval.reviewedBy!=='Verso'||approval.reviewedAt!=='2026-10-15T16:26:47Z'||approval.approvalScope!=='Somente os dois SVGs acima no artigo público; PNGs de conferência excluídos.'||approval.metadata?.title!==expectedTitle||approval.metadata?.description!==expectedDescription||approval.metadata?.h1!==expectedH1||approval.metadata?.canonical!==allowed.canonical_url||ev.receiptSha256!==expectedReceipt||ev.intentDecision?.decided_at_utc!=='2026-10-15T16:28:10Z'||ev.editorialReview?.markdown_sha256!==allowed.digest||ev.visualReview?.timbre_adjudication!=='PASS somente como figuras editoriais, sem editar os dois SVGs'||prov.standing_authorization?.authorized_by!=='Henrique'||prov.delegated_release_approval?.release_approved_at_utc!=='2026-10-15T16:30:30Z'||prov.editorial_review_by_henrique!==false||prov.personal_hash_approval_by_henrique!==false||approval.sources?.releaseReceiptSha256!==expectedReceipt||approval.sources?.sourceReviewSha256!=='2692db14b2ce2bb29a541568cd048b08ed728c33f943b018fbdfa85ca1314134'||JSON.stringify(approval.assets)!==JSON.stringify(expectedAssets)||JSON.stringify(approval.approvedFiles)!==JSON.stringify(expectedFiles)||JSON.stringify(approval.excludedAssets)!==JSON.stringify(['*.png']))fail('ERP approval metadata/provenance/asset scope mismatch');
      for(const asset of allowed.assets)if(sha256(await readFile(path.join(root,'src/content/blog',asset.path)))!==asset.digest)fail('ERP approved SVG asset hash mismatch: '+asset.path);
    }
    if(approval && !privateFixture && d.content_id==='torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias') {
      const receiptHash='64df680bc7dadb73fe15842c0820cb9fca0ca12a25c89a8ff423275d018eaaa5';
      const sourceHash='57aa070426cc1c010dedf721e9b64e748dc32bc2e5051fd97181cca94b01bc71';
      const assetManifestHash='4bd3335396355b191e3bc1bd9d43d926baf2374812db901c91b7e6e070cc05fb';
      const historyHash='a95898b8542f12fe7d93c8fec83edd88025d103794848e290f5e944eaae7d2fb';
      const title='Refazer um sistema? 7 evidências para decidir | Torno';
      const description='Antes de refazer um sistema, confira acessos, fluxo crítico, dependências e recuperação. Um checklist para comparar propostas com evidências.';
      const h1='Antes de refazer um sistema: 7 evidências para decidir';
      const assets=allowed.assets.map(a=>({path:a.path,sha256:a.digest}));
      const files=[{path:'antes-de-refazer-sistema-evidencias.md',sha256:releaseDigest},...assets];
      const ev=approval.authorizationEvidence??{};const prov=ev.authorizationProvenance??{};
      if(d.h1!==h1||d.seo_title!==title||d.seo_description!==description||d.summary!=='Peça evidências sobre o sistema existente antes de aprovar uma correção ou reconstrução.'||approval.contentRevision!==allowed.digest||approval.approvedBy!=='Farol (delegado operacional)'||approval.approvedAt!=='2026-10-15T22:28:58Z'||approval.reviewedBy!=='Verso'||approval.reviewedAt!=='2026-10-15T22:25:20Z'||approval.approvalScope!=='Somente Markdown final e os dois SVGs corrigidos são conteúdo público aprovado; quatro PNGs 360/1080 são exportações de QA, excluídas do runtime.'||approval.metadata?.title!==title||approval.metadata?.description!==description||approval.metadata?.h1!==h1||approval.metadata?.canonical!==allowed.canonical_url||ev.receiptSha256!==receiptHash||ev.intentDecision?.final_decided_at_utc!=='2026-10-15T22:28:11Z'||ev.editorialReview?.markdown_sha256!==allowed.digest||ev.editorialReview?.source_evidence_sha256!==sourceHash||ev.visualReview?.timbre_status!=='PASS GLOBAL dos dois SVGs corrigidos como figuras editoriais autocontidas'||prov.standing_authorization?.authorized_by!=='Henrique'||prov.delegated_release_approval?.release_approved_at_utc!=='2026-10-15T22:28:58Z'||prov.editorial_review_by_henrique!==false||prov.personal_hash_approval_by_henrique!==false||approval.sources?.releaseReceiptSha256!==receiptHash||approval.sources?.sourceReviewSha256!==sourceHash||approval.sources?.assetManifestSha256!==assetManifestHash||approval.sources?.historyAfterApprovalSha256!==historyHash||JSON.stringify(approval.assets)!==JSON.stringify(assets)||JSON.stringify(approval.approvedFiles)!==JSON.stringify(files)||JSON.stringify(approval.excludedAssets)!==JSON.stringify(['*.png']))fail('rebuild-evidence approval metadata/provenance/asset scope mismatch');
      for(const asset of allowed.assets)if(sha256(await readFile(path.join(root,'src/content/blog',asset.path)))!==asset.digest)fail('rebuild-evidence approved SVG asset hash mismatch: '+asset.path);
    }
    if(d.content_id===maintenanceId && !privateFixture)await verifyMaintenanceApproval(root,approval,d);
    if(approval)timestamp(approval.approvedAt,'release decision');
    let effective=d;
    if (approval && d.status==='review') {
      timestamp(approval.reviewedAt,'editorial review');
      effective={...d,status:'approved',reviewer:approval.reviewedBy,reviewed_at:approval.reviewedAt,release_approved_by:approval.approvedBy,release_approved_at:approval.approvedAt,release_approval_evidence:JSON.stringify(approval.authorizationEvidence)};
    }
    const eligible=validateRecord(effective,match[2],buildAt,approval);
    if(ids.has(d.content_id))fail(`duplicate content_id: ${d.content_id}`);ids.add(d.content_id);
    const relative=path.relative(root,file);sourceHashes[relative]=sha256(raw);
    if(!eligible)continue;
    if(!privateFixture && authoredIds.has(effective.content_id)) {
      effective={...effective,author_name:authorship.confirmedBy,author_basis:authorship.basis};
    }
    const key=`${d.intent_id}:${d.locale}`;
    if(paths.has(d.proposed_path)||intents.has(key))fail('duplicate path or intention');
    paths.add(d.proposed_path);intents.add(key);
    entries.push({id:effective.content_id,collectionId:path.relative(source,file).replace(/\.md$/,'').toLowerCase(),file:relative,hash:sourceHash,contentHash:releaseDigest,path:effective.proposed_path,slug:effective.proposed_path.split('/').filter(Boolean).at(-1),locale:effective.locale,data:effective,alternates:[]});
  }
  if (!privateFixture && (entries.length>RELEASE_ALLOWLIST.length || entries.some(e=>{const allowed=RELEASE_ALLOWLIST.find(row=>row.content_id===e.id);return !allowed||e.contentHash!==allowed.digest||e.path!==allowed.path||e.locale!==allowed.locale;}))) fail('manifest exceeds the exact article allowlist');
  for(const e of entries) {
    const d=e.data;
    if(d.translation_of == null)continue;
    const other=entries.find(x=>x.id===d.translation_of);
    // An unavailable translation is not an alternate.
    if(!other)continue;
    if(other.locale===e.locale || other.data.intent_id!==d.intent_id)fail('translation intention/locale mismatch');
    if(other.data.translation_of!==e.id)fail('translation pair must be reciprocal by content_id');
    const approval=d.translation_status;
    if(!approval || typeof approval!=='object' || approval.status!=='approved' || approval.scope_equivalent!==true || !text(approval.evidence) || !text(approval.reviewed_by))fail('translation needs verified scope equivalence');
    timestamp(approval.reviewed_at,'translation reviewed_at');
    if(Date.parse(approval.reviewed_at)>Date.parse(buildAt))fail('future translation approval');
    // Both release approvals are required by validateRecord; this explicit review covers the pair.
    const alts=[e,other].map(x=>({hreflang:x.locale,href:BLOG_ORIGIN+x.path}));
    alts.push({hreflang:'x-default',href:BLOG_ORIGIN+[e,other].find(x=>x.locale==='en').path});
    e.alternates=alts;
  }
  const manifest={version:1,buildAt,sourceHashes,entries};
  const dir=path.join(root,'.astro');await mkdir(dir,{recursive:true});
  const target=path.join(dir,'blog-manifest.json');
  await writeFile(target+'.tmp',JSON.stringify(manifest,null,2)+'\n');await rename(target+'.tmp',target);
  return manifest;
}
/** Inspect rendered Markdown links, including relative URLs, references, HTML and fragments. */
export async function validateBlogOutput(root, manifest) {
  for(const e of manifest.entries) {
    const html=await readFile(path.join(root,e.path,'index.html'),'utf8');
    if(e.id==='torno-artigo-pt-20261015-criterios-aceite-mvp') {
      if(!/<figure\b/.test(html) || !/<figcaption\b/.test(html)) fail('approved criteria diagram must render semantic figure/figcaption');
      if(!/<figure\b[^>]*>[\s\S]*?<img\b[^>]*alt="Diagrama de critérios de aceite para portal de pedidos hipotético: contexto, ação, resultado e evidência; três cenários: pedido válido, informação incompleta e nova tentativa após perda da resposta\."[^>]*src="\/_astro\/torno\.[^"]+\.svg"[^>]*>[\s\S]*?<figcaption\b[^>]*>(?:<em>)?Diagrama original preparado para este artigo\. Os cenários são hipotéticos\.(?:<\/em>)?<\/figcaption>[\s\S]*?<\/figure>/.test(html)) fail('approved criteria figure lost its exact alt, caption, or approved SVG');
    }
    if(e.id==='torno-artigo-pt-20261015-integracao-erp-briefing') {
      const expected=[
        ['integracao-erp-fluxo','Mapa hipotético: aprovação comercial no CRM gera envio ao ERP; identificador e situação retornam ao CRM. É preciso definir onde cada cadastro pode ser alterado.','Exemplo hipotético. Direção dos dados e permissões devem ser confirmadas para os sistemas envolvidos.'],
        ['integracao-erp-pendencias','Briefing em três grupos: confirmado com documentação; a confirmar com responsável e impacto; fora da primeira etapa com exclusões registradas.','Modelo de organização do briefing. Os itens são ilustrativos, sem relação com um cliente real.'],
      ];
      const figures=[...html.matchAll(/<figure\b[^>]*class="[^"]*blog-figure--erp[^"]*"[^>]*>([\s\S]*?)<\/figure>/g)].map(m=>m[1]);
      if(figures.length!==2)fail('ERP requires exactly two semantic editorial figures');
      for(let i=0;i<2;i++){
        const [name,alt,caption]=expected[i];const f=figures[i];
        if(!f.includes('alt="'+alt+'"')||!new RegExp('src="/_astro/'+name+'\\.[^"/]+\\.svg"').test(f)||!f.includes('<figcaption')||!f.includes(caption))fail('ERP figure/alt/caption/SVG mismatch: '+name);
      }
      if(!html.includes('<title>Integração com ERP: briefing para orçamento | Torno</title>')||!html.includes('content="Veja quais dados, documentos, acessos e responsáveis reunir antes de pedir orçamento de integração com ERP. Um roteiro para explicitar dependências."')||!html.includes('<link rel="canonical" href="https://tornostudio.com/blog/integracao-erp-briefing-orcamento/">')||[...html.matchAll(/<h1\b/g)].length!==1||/datePublished|dateModified|<time\b/.test(html))fail('ERP SEO/schema/byline/known-date mismatch');
    }
    if(e.id==='torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias') {
      const expected=[
        ['evidencias-decisao','Sequência de avaliação: reproduzir o fluxo, localizar dependências, testar recuperação e comparar alternativas.','Figura 1. Evidências que conectam o problema operacional à decisão de investimento. Diagrama original Torno Studio.'],
        ['exemplo-aprovacao','Exemplo hipotético: preservar cadastro e histórico, investigar a regra de aprovação e verificar os relatórios afetados.','Figura 2. Exemplo hipotético, sem dados de clientes: o limite da correção depende das relações entre os módulos. Diagrama original Torno Studio.'],
      ];
      const figures=[...html.matchAll(/<figure\b[^>]*class="[^"]*blog-figure--rebuild[^"]*"[^>]*>([\s\S]*?)<\/figure>/g)].map(m=>m[1]);
      if(figures.length!==2)fail('rebuild-evidence requires exactly two semantic editorial figures');
      for(let i=0;i<2;i++){
        const [name,alt,caption]=expected[i];const f=figures[i];
        if(!f.includes('alt="'+alt+'"')||!new RegExp('src="/_astro/'+name+'\\.[^"/]+\\.svg"').test(f)||!f.includes('<figcaption')||!f.includes(caption))fail('rebuild-evidence figure/alt/caption/SVG mismatch: '+name);
      }
      if(!html.includes('<title>Refazer um sistema? 7 evidências para decidir | Torno</title>')||!html.includes('content="Antes de refazer um sistema, confira acessos, fluxo crítico, dependências e recuperação. Um checklist para comparar propostas com evidências."')||!html.includes('<link rel="canonical" href="https://tornostudio.com/blog/antes-de-refazer-sistema-evidencias/">')||[...html.matchAll(/<h1\b/g)].length!==1||/datePublished|dateModified|<time\b/.test(html))fail('rebuild-evidence SEO/schema/byline/date mismatch');
    }
    if(e.id===maintenanceId)await validateMaintenanceHtml(root,html);
    const urls=[...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)].map(m=>m[1]);
    urls.push(...e.data.internal_links.map(l=>l.path));
    for(const raw of urls) {
      const u=new URL(raw.replaceAll('&amp;','&'),BLOG_ORIGIN+e.path);
      if(!['http:','https:'].includes(u.protocol))continue;
      if(u.origin!==BLOG_ORIGIN)continue;
      const rel=decodeURIComponent(u.pathname).replace(/^\//,'');
      const target=path.resolve(root,!rel ? 'index.html' : rel.endsWith('/')?rel+'index.html':rel);
      if(!target.startsWith(path.resolve(root)+path.sep))fail('link escapes output');
      let content;
      try{content=await readFile(target,'utf8');}catch{fail(`broken or invisible link: ${e.path} -> ${raw}`);}
      if(u.hash && target.endsWith('.html')) {
        const id=decodeURIComponent(u.hash.slice(1));
        if(![...content.matchAll(/\bid=["']([^"']+)["']/g)].some(m=>m[1]===id))fail(`missing fragment: ${raw}`);
      }
    }
  }
}

/** Remark: wrap only hash-approved article diagrams before Astro collects images. */
export function blogCriteriaFigure() {
  return (tree, file) => {
    if(insertMaintenanceFigure(tree,file))return;
    const id=file.data?.astro?.frontmatter?.content_id;
    const configs={
      "torno-artigo-pt-20261127-gestao-contratos-vencimento": [
        {"asset": "./torno-contratos-trilho-renovacao.svg", "alt": "Ilustração, com o selo exemplo fictício, do contrato CT-FOR-031 desenhado como uma linha de trem com estações e dois desvios: assinatura em 20/03/2025, início em 01/04/2025, aditivo 01 em 12/08/2025; primeiro desvio no limite do aviso de 31/12/2025, que passou sem decisão e levou à renovação automática de 01/04/2026; alertas de 16/10 a 09/12/2026; decisão de não renovar em 09/12, notificação em 10/12, aviso de recebimento em 14/12, limite interno em 16/12; segundo desvio no limite contratual de 31/12/2026, com o ramo da renovação até 31/03/2028 fechado; fim em 31/03/2027.", "caption": "Exemplo fictício: empresas, pessoas, contrato, cláusulas e datas inventados; a contagem do limite do aviso é a confirmada pelo jurídico da empresa fictícia, não interpretação jurídica. O trilho mostra que a decisão acontece no limite do aviso, 90 dias antes do fim. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-contratos-despertadores-aviso.svg", "alt": "Ilustração, com o selo exemplo fictício, de dois despertadores do contrato CT-FOR-044, assinatura de software de roteirização: o vermelho, que toca primeiro, marca o limite do aviso em segunda 11/01/2027; o cinza, 30 dias depois, a renovação em quarta 10/02/2027. Abaixo, a fita de eventos: alerta de 60 dias para Rodrigo T. em 12/11/2026, sem decisão; desligamento de Rodrigo em 19/11, contrato sem responsável ativo; reatribuição a Tânia S. em 23/11; decisão de renovar com 9 licenças em 07/12; ordem de alteração nº 2 aceita pelo fornecedor em 11/12; alertas de 30, 15 e 7 dias cancelados pela decisão.", "caption": "Exemplo fictício: empresas, pessoas, contrato, termos e datas inventados; a reatribuição no desligamento e o cancelamento dos alertas são regras da empresa fictícia, não comportamento padrão de ferramenta. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-contratos-pasta-sanfonada.svg", "alt": "Ilustração, com o selo exemplo fictício, de uma pasta sanfonada do contrato CT-CLI-112 em 15/03/2027 com sete divisórias: contrato assinado em 22/05/2024, com a cláusula de 300 posições-palete riscada; aditivo 01 de 02/06/2025, com 450 posições-palete a partir de 01/07/2025; comprovante do seguro das mercadorias, prazo 10/02/2027, enviado em 05/02/2027; notificação de denúncia do cliente recebida em 08/01/2027, encerramento em 09/03/2027; faturamento final, março proporcional e diárias de 12 posições-palete de 10/03 a 12/03; termo de encerramento e quitação em 15/03/2027; guarda até 15/03/2037.", "caption": "Exemplo fictício: empresas, pessoas, contrato, cláusulas, valores e datas inventados; o prazo de guarda é decisão do jurídico da empresa fictícia, não recomendação de prazo. Cada divisória é um documento ou um evento com data e prova. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261127-controle-documentos-sistema": [
        {"asset": "./torno-documentos-arvore-revisoes.svg", "alt": "Ilustração, com o selo exemplo fictício, da árvore de revisões da IT-USI-014 da Exemplo Instrumentais Cirúrgicos Ltda.: rev. 00 e rev. 01 obsoletas, retidas e bloqueadas até 08/08/2030 e 04/12/2031; motivo da revisão 02, a RNC-2026-118 de 03/11/2026; rascunho 02-A recusado em 16/11 por usar a cota da revisão C do desenho do cliente DES-CLI-4471, que passou à revisão D em 13/11, ramo encerrado sem número de revisão; rascunho 02-B verificado em 23/11 e aprovado em 25/11; rev. 02 vigente desde terça 01/12/2026, com 5 de 6 operadores treinados até 30/11 e Wagner L., de férias, treinado em 07/12 antes de operar.", "caption": "Exemplo fictício: empresa, pessoas, documentos, desenho do cliente, datas e prazos de guarda inventados; não é orientação regulatória nem de certificação. A árvore mostra uma revisão vigente por vez, as obsoletas retidas e bloqueadas e o rascunho recusado guardado no histórico, sem número de revisão. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-documentos-carimbos-copias.svg", "alt": "Ilustração, com o selo exemplo fictício, de três folhas da IT-USI-014 com carimbos: cópia controlada nº 2 da rev. 02, entregue no torno CNC-07 na terça 01/12/2026 às 07:40; cópia não controlada da rev. 01, impressa por Juliana P. na sexta 27/11/2026 às 14:05 para reunião; e cópia controlada nº 1 da rev. 01, do CNC-05, carimbada obsoleto e retida, devolvida na quarta 02/12/2026 às 09:15 depois do aviso das 08:00 de 01/12 ao supervisor e à qualidade.", "caption": "Exemplo fictício: empresa, pessoas, postos, cópias, horários e prazos inventados; as regras de impressão e de recolhimento são da empresa fictícia, não requisito de norma nem comportamento padrão de ferramenta. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-documentos-gaveteiro-estados.svg", "alt": "Ilustração, com o selo exemplo fictício, de um arquivo de aço com seis gavetas, uma por estado do documento, na segunda 07/12/2026: em elaboração (IT-MON-003), em verificação (FR-QUA-031), aprovado aguardando vigência (PR-QUA-005, vigência em 15/12), vigente, a única que o chão de fábrica abre (IT-USI-014 rev. 02 e PR-QUA-002 rev. 01), obsoleto, retido e bloqueado, com cadeado, só a qualidade abre (IT-USI-014 rev. 01 e rev. 00), e eliminado, onde só fica o termo TE-2026-04 de 09/11/2026.", "caption": "Exemplo fictício: empresa, documentos, pessoas, datas e prazos inventados; os estados e os perfis que abrem cada gaveta são escolhas da empresa fictícia, não requisito de norma nem comportamento padrão de ferramenta. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261127-controle-treinamentos-nr-sistema": [
        {"asset": "./torno-treinamentos-matriz-calor.svg", "alt": "Ilustração de uma matriz de calor, com o selo exemplo fictício, da Exemplo Estruturas Metálicas Ltda., situação em terça 01/12/2026. Linhas: Bruno A., montador; Diego R., montador; Lúcia F., eletricista; Márcio T., caldeireiro; Carla S., almoxarifado, passa a dobradeira em 18/01/2027. Colunas: integração e ordem de serviço; NR-35 altura; NR-10 básico; NR-33 trabalhador autorizado; NR-12 dobradeira. Células: Bruno, NR-35 vence, 09/12/2026, faltam 8 dias; Diego, NR-35 válido até 04/05/2028, convalidado; Lúcia, NR-10 afastada, eventual no retorno, válido até 16/03/2027; Márcio, NR-35 vencido desde 20/11/2026 e NR-33 vence, 14/01/2027, faltam 44 dias; Carla, NR-12 pendente, exigido a partir de 18/01/2027; integração em dia para todos; demais células não exigido. Legenda: em dia; vence em até 60 dias; vencido; pendente ou eventual; não exigido na função. Quadro: certificado EAD de NR-35 de Bruno, de 20/11/2026, recusado como periódico porque a NR-35 exige treinamento presencial desde 16/07/2026 (item 35.4.5); turma presencial marcada para terça 08/12/2026. Rodapé: cada célula vem da matriz da função na data, não de uma coluna digitada. Exemplo fictício.", "caption": "Exemplo fictício: empresa, pessoas, funções, datas e situações inventadas; não é orientação de SST sobre nenhuma função real. A matriz mostra, numa data, o que cada pessoa precisa ter e em que situação está. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-treinamentos-semaforo-escala.svg", "alt": "Ilustração da escala do dia em forma de semáforos, com o selo exemplo fictício, para quinta-feira 10/12/2026, Exemplo Estruturas Metálicas Ltda., supervisor Rogério. Quatro tarefas, cada uma com um semáforo. Tarefa 1, montagem da cobertura do galpão 2, altura de 9 m, exige NR-35, autorização e ASO apto: Bruno A., luz vermelha, bloqueado, NR-35 válido até 09/12/2026, turma de 08/12 remarcada para 14/12; seta para o substituto sugerido Diego R., liberado, NR-35 válido até 04/05/2028, convalidado em 25/11, escolhido pelo supervisor. Tarefa 2, entrada no tanque T-3, espaço confinado, exige NR-33 trabalhador autorizado: Márcio T., luz amarela, liberado com aviso, NR-33 válido até 14/01/2027, faltam 35 dias. Tarefa 3, manutenção do quadro QD-4, eletricidade, exige NR-10: Lúcia F., luzes apagadas, não escalável, afastada de 21/09/2026 a 03/01/2027, tarefa remarcada pelo supervisor. Tarefa 4, pintura de vigas no solo, exige integração e ordem de serviço: Bruno A., luz verde, liberado. Quadro: conferido na data da tarefa, não na de hoje; quem escolhe o substituto é o supervisor; em altura, eletricidade, espaço confinado e dobradeira, o SST não admite liberação de exceção. Rodapé: regras de bloqueio da empresa fictícia, escritas pelo SST. Exemplo fictício.", "caption": "Exemplo fictício: empresa, pessoas, tarefas, datas e regras de bloqueio inventadas; o bloqueio é decisão do SST da empresa fictícia, não comportamento padrão de ferramenta nem orientação de SST. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-treinamentos-cracha-habilitacoes.svg", "alt": "Ilustração de um crachá de habilitações, frente e verso, com o selo exemplo fictício. Frente: Exemplo Estruturas Metálicas Ltda.; silhueta no lugar da foto; Bruno A., montador, matrícula 0417; impresso em 15/06/2026; código de consulta ilustrativo, que não é um código real. Verso, situação na impressão: integração e ordem de serviço, em dia; NR-35 altura, periódico presencial de 10/12/2024, válido até 09/12/2026; autorização para altura, vigente; ASO apto para altura. Abaixo, um balão vermelho, consulta pelo código em quinta 10/12/2026: NR-35 vencido desde 10/12/2026; autorização para altura suspensa; certificado EAD de 20/11/2026 recusado, porque a NR-35 exige presencial desde 16/07/2026; próxima turma segunda 14/12/2026. Um balão verde, consulta em segunda 14/12/2026: NR-35 periódico presencial de 14/12/2026, válido até 13/12/2028; autorização para altura vigente. Rodapé: o crachá mostra o dia em que foi impresso; quem confere a habilitação lê a consulta do dia. Exemplo fictício.", "caption": "Exemplo fictício: empresa, pessoa, matrícula, datas e situações inventadas; não é modelo oficial de identificação nem orientação de SST. O crachá envelhece; a consulta do dia não. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261126-reembolso-despesas-sistema": [
        {"asset": "./torno-reembolso-balanca-adiantamento.svg", "alt": "Ilustração de duas balanças, com o selo exemplo fictício, da Exemplo Climatização Ltda. Na primeira, Renata M., viagem de 08 a 11/12/2026: no prato esquerdo, adiantamento de R$ 1.500,00 pago na segunda 07/12; no direito, despesas aprovadas de hospedagem 795,00, alimentação 367,30, estacionamento 30,00 e quilometragem 558,00, total 1.750,30, e a balança pende para as despesas. Glosa em 09/12: 135,50 menos o limite de 120,00, igual a 15,50. Saldo a receber: 1.750,30 menos 1.500,00, igual a R$ 250,30, pago no lote de terça 22/12/2026 e conciliado no extrato do mesmo dia. Na segunda, Diego A., viagem de 15 a 17/12/2026: adiantamento de R$ 800,00 pago na segunda 14/12, contra hospedagem 396,00 e alimentação 116,40, total 512,40, e a balança pende para o adiantamento. Saldo a devolver: 800,00 menos 512,40, igual a R$ 287,60; prazo de prestação no domingo 27/12/2026, alerta ao gestor em 28/12, prestação enviada em 04/01/2027 e Pix de devolução em 05/01, conciliado pelo identificador. Rodapé: desconto em folha nunca é automático; é decisão do RH com o jurídico, registrada no sistema. Exemplo fictício.", "caption": "Exemplo fictício: empresa, funcionários, viagens, valores, prazos e datas inventados; não é orientação trabalhista nem contábil sobre nenhum caso real. Cada balança mostra o saldo que o sistema calcula e o caminho que ele toma: pagamento no lote ou devolução conciliada. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-reembolso-cupom-anotado.svg", "alt": "Ilustração de um cupom de NFC-e fictício, com o selo exemplo fictício, do Restaurante Maré Alta Ltda., Porto Claro: prato executivo 44,90 e água 7,40, total R$ 52,30, cartão de crédito; consumidor com CPF mascarado; NFC-e nº 4812, série 1, emissão 08/12/2026 20:41:07; chave de acesso fictícia de 44 dígitos em 11 blocos; QR Code ilustrativo. Seis marcas numeradas, explicadas abaixo do cupom: 1, chave de acesso lida do QR Code, aceita como item 3 no primeiro envio em 14/12 às 09:12 e bloqueada no segundo envio às 09:20 por ser a mesma chave; 2, emitente com CNPJ e nome vindos da nota; 3, data e hora dentro da viagem de 08 a 11/12; 4, consumidor com CPF da funcionária ou não identificado aceito para alimentação, hotel exige CNPJ da empresa; 5, valor da nota e soma da alimentação do dia, 48,90 + 52,30 = 101,20, abaixo do limite de 120,00; 6, situação autorizada na consulta pela chave, nota cancelada vai para o financeiro. Rodapé: o sistema confere e mostra; a exceção é decidida por quem tem a alçada, com motivo registrado. Exemplo fictício.", "caption": "Exemplo fictício: restaurante, CNPJ, CPF, nota, chave de acesso, horários e valores inventados. O cupom mostra o que o sistema confere em cada campo, não um leiaute oficial. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-reembolso-mapa-quilometragem.svg", "alt": "Ilustração de um mapa fictício, com o selo exemplo fictício, da viagem de Renata M. de 08 a 11/12/2026. A matriz em Vila Esperança e a cidade de Porto Claro, onde ficam o hotel e dois clientes, ligadas por uma rodovia tracejada de 214 km por trecho, referência de rota da política; em Porto Claro, um circuito entre o hotel e os clientes, com 37 km de deslocamentos locais. Abaixo, o odômetro do carro de Renata: 48210 na saída, terça 08/12, 07h10, e 48675 na volta, sexta 11/12, 19h30. Contas: 48.675 menos 48.210, igual a 465 km; rota 214 + 214 + 37 = 465 km, diferença 0 km; tolerância da política até 10% acima da rota; 465 km vezes R$ 1,20, igual a R$ 558,00. Num quadro vermelho, simulação: nota de combustível de 10/12, R$ 180,00, recusada na mesma prestação porque o valor por km já paga combustível e desgaste. Rodapé: R$ 1,20 por km é valor da política fictícia, não referência de mercado nem regra trabalhista ou fiscal. Exemplo fictício.", "caption": "Exemplo fictício: cidades, distâncias, odômetro, horários e valor por km inventados; não é referência de valor nem orientação trabalhista ou fiscal sobre quilometragem. O mapa mostra as duas bases que o sistema compara antes de pagar. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261126-controle-ferias-sistema": [
        {"asset": "./torno-ferias-regua-dois-anos.svg", "alt": "Ilustração de uma régua de calendário de dois anos, com o selo exemplo fictício, de maio de 2025 a junho de 2027, para Marina S., da Exemplo Gráfica Ltda., admitida em 05/05/2025. Na faixa de cima, o primeiro período aquisitivo, de 05/05/2025 a 04/05/2026, e na de baixo o período concessivo correspondente, de 05/05/2026 a 04/05/2027; em paralelo, o segundo período aquisitivo, de 05/05/2026 a 04/05/2027. Sobre o concessivo, três blocos de férias gozadas: 13 a 26/07/2026, 14 dias; 09 a 18/11/2026, 10 dias; 22 a 27/04/2027, 6 dias; total 30. Duas bandeiras de alerta: 120 dias antes, em 04/01/2027, e 45 dias antes, em 20/03/2027. No fim do concessivo, em 04/05/2027, uma linha vermelha: a partir de 05/05/2027, cada dia gozado é pago em dobro. Um bloco tracejado de simulação, de 03 a 08/05/2027, mostra 2 dias dentro do prazo e 4 dias fora, em dobro. Abaixo, uma tabela com cada período: início, fim, dias, aviso até e pagamento em. Rodapé: o sistema alerta antes do vencimento; não conta o dobro só depois. Exemplo fictício.", "caption": "Exemplo fictício: empregada, datas, faltas, alertas e regra de pagamento inventados; não é orientação trabalhista sobre nenhum caso real. A régua mostra os dois relógios do vínculo e onde o dobro começaria. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-ferias-calendario-abril-2027.svg", "alt": "Ilustração de uma folha de calendário de abril de 2027, com o selo exemplo fictício, semana começando na segunda. Cada dia tem uma cor: quarta 21/04 é feriado, Tiradentes; os domingos 4, 11, 18 e 25 são repouso semanal; segunda 19/04 e terça 20/04 estão hachuradas em vermelho como início vedado pelo feriado; as sextas e sábados 2 e 3, 9 e 10, 16 e 17, 23 e 24 estão hachurados como início vedado pelo domingo; quinta 29/04 e sexta 30/04 estão hachuradas como início vedado pelo feriado de sábado 01/05. Um balão sobre 19/04: pedido de Marina recusado, art. 134, parágrafo 3º. Uma seta para quinta 22/04, em verde: início escolhido, 6 dias até terça 27/04, faixa verde sobre os dias 22 a 27. Ao lado, a legenda: feriado; repouso semanal; início vedado; início permitido; férias. Rodapé: o bloqueio vale para o dia de início; feriado dentro das férias conta como dia corrido. Exemplo fictício.", "caption": "Exemplo fictício: empregada, pedido e escolha inventados; o calendário de abril de 2027 e os feriados nacionais são reais, mas a escala com repouso no domingo e a ausência de feriados locais são escolhas do exemplo. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-ferias-quebra-cabeca-dias.svg", "alt": "Ilustração de dois quebra-cabeças de dias, com o selo exemplo fictício. No de cima, Marina S.: uma barra de 30 quadradinhos dividida em três peças encaixadas, 14 dias de 13 a 26/07/2026, 10 dias de 09 a 18/11/2026 e 6 dias de 22 a 27/04/2027, com um visto verde: um período com 14 ou mais, os demais com 5 ou mais, no máximo três. Ao lado, três peças recusadas, com xis vermelho: 14 mais 12 mais 4, porque 4 é menor que 5; 10 mais 10 mais 10, porque nenhum chega a 14; 14 mais 8 mais 5 mais 3, porque são quatro períodos. No de baixo, Caio T.: 9 ausências, 2 com atestado aceito, 7 faltas, faixa de 6 a 14 faltas, 24 dias; uma barra de 24 quadradinhos com 8 separados como abono, um terço de 24, pedido em 10/08/2026, prazo 16/08/2026; os 16 restantes numa peça só, de 05 a 20/10/2026. Duas tentativas recusadas: 14 mais 2 e 11 mais 5. Rodapé: 16 dias não se dividem; o sistema recusa antes de alguém montar o calendário. Exemplo fictício.", "caption": "Exemplo fictício: empregados, faltas, classificação de ausências, pedido de abono e datas inventados; não é orientação sobre faltas, abono ou fracionamento num caso real. Cada peça mostra uma regra do art. 134, § 1º, e do art. 143. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261126-controle-patrimonial-ativo-imobilizado": [
        {"asset": "./torno-patrimonio-grafico-contabil-fiscal.svg", "alt": "Ilustração de um gráfico de linhas, com o selo exemplo fictício, da empilhadeira PAT-000301 da Exemplo Armazéns Gerais Ltda., custo de 150 mil reais, disponível para uso em 06/04/2026. O eixo horizontal vai de abril de 2026 a março de 2036; o vertical, de zero a 150 mil reais. Linha azul, valor contábil: 142.125 no fim de 2026, 131.625 no fim de 2027, onde uma linha vertical vermelha marca a revisão de 31/12/2027; depois 117.765, 103.905, 90.045, 76.185, 62.325 e 48.465 nos fins de 2028 a 2033, e 45.000 a partir de março de 2034, uma linha reta no valor residual. Linha laranja tracejada, saldo fiscal: 138.750 no fim de 2026, 123.750 no fim de 2027 e 15 mil a menos por ano, até zero em março de 2036, pela linha 8427 do Anexo III, 10% ao ano, 1.250 reais por mês. Uma área sombreada entre as duas linhas indica a diferença. Abaixo, um quadro com a quota mensal: contábil 875 reais até 2027 e 1.155 depois, pela revisão da vida útil total de 10 para 8 anos com residual de 45 mil; fiscal 1.250 reais de abril de 2026 a março de 2036. Depois, uma tabela com os saldos de fim de ano de 2026 a 2035, contábil e fiscal. Rodapé: o sistema não lança a diferença sozinho. Exemplo fictício.", "caption": "Exemplo fictício: bem, custo, vidas úteis, valor residual, revisão e convenções inventados; não é orientação contábil nem tributária sobre nenhum bem real. A linha contábil muda de inclinação na revisão, sem refazer o passado; a fiscal segue a taxa da tabela. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-patrimonio-planta-inventario.svg", "alt": "Ilustração de uma planta baixa do escritório e do armazém da matriz da Exemplo Armazéns Gerais Ltda., com o selo exemplo fictício, no inventário de segunda 16/11/2026. Salas: recepção, financeiro, RH, comercial, sala de reunião, coordenação, depósito e armazém. Legenda com quatro símbolos: círculo verde, lido no local, 236; losango azul, lido em outro local, 5; xis vermelho, cadastrado e não achado, 7; triângulo roxo, achado sem cadastro, 3; total de esperados 236 mais 5 mais 7 igual a 248. Na planta: na sala de reunião, losango, 3 cadeiras do RH; no comercial, losango, 2 monitores do financeiro, xis PAT-000210 projetor e triângulo monitor sem plaqueta; no financeiro, xis PAT-000233 impressora, xis PAT-000175 notebook e triângulo nobreak; no RH, xis PAT-000098 cadeira; na coordenação, xis PAT-000187 notebook; no depósito, xis PAT-000140 e PAT-000141 cadeiras; na recepção, triângulo cafeteira. Abaixo, o quadro da segunda rodada de 17 e 18/11: 140 e 141, plaqueta descolada, reetiquetadas, localizadas; 175, home office, termo e foto da plaqueta, localizado; 210, conserto, nota de remessa de 26/10, em manutenção externa; 187, furto em 28/10 com boletim de ocorrência, proposta de baixa; 098, descartada em agosto, declaração, proposta de baixa por sucata; 233, sem explicação, pendente com prazo. Rodapé: não achado não vira baixa automática; cada destino tem documento. Exemplo fictício.", "caption": "Exemplo fictício: empresa, salas, números patrimoniais, contagens, datas e documentos inventados. Cada bem esperado cai num de quatro resultados, e cada não achado termina localizado, proposto para baixa ou pendente, sempre com documento. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-patrimonio-plaqueta-ficha-vida.svg", "alt": "Ilustração de uma plaqueta patrimonial ampliada, com o selo exemplo fictício, do notebook PAT-000187 da Exemplo Armazéns Gerais Ltda. Na plaqueta, um código QR ilustrativo e o número PAT-000187 em texto grande, com a nota: carrega só o número; local e responsável ficam no sistema. Abaixo, a ficha de vida do bem, em linha do tempo: 08/05/2024, NF-e de entrada, 6.000 reais; 13/05/2024, disponível para uso na filial, responsável Bruno, depreciação contábil de 90 reais por mês e fiscal de 100 reais por mês; 03/03/2025, saída da filial; 05/03/2025, aceite de Ana na matriz por leitura da plaqueta, centro de custo muda; 28/10/2026, furto, boletim de ocorrência, sem registro no sistema; 16/11/2026, inventário, cadastrado e não achado; 19/11/2026, baixa aprovada, 30 quotas, valor contábil e perda de 3.300 reais, saldo fiscal de 3.000 reais para o contador. Um carimbo vermelho: baixado, não excluído. Exemplo fictício.", "caption": "Exemplo fictício: bem, datas, pessoas, valores e documentos inventados; não é orientação contábil sobre baixa nem sobre furto. O número fica com o bem do começo ao fim, e cada evento tem data, autor e documento. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261125-ponto-eletronico-rep-p": [
        {"asset": "./torno-ponto-fita-tratamento.svg", "alt": "Ilustração de uma fita de comprovantes de ponto, com o selo exemplo fictício, de Paula R. da Exemplo Comercial Ltda., na quarta 11/11 e na quinta 12/11/2026, com uma folha de papel vegetal sobreposta à direita representando o tratamento. Na fita, as marcações originais, cada uma com seu número sequencial: quarta, NSR 1041, 08:02; NSR 1047, 12:00; NSR 1063, 17:01; o espaço entre 12:00 e 17:01 aparece vazio, com o aviso: 3 marcações, número ímpar. Quinta, NSR 1072, 07:59; NSR 1080, 12:00; NSR 1081, 12:00 e 40 segundos; NSR 1090, 13:01; NSR 1112, 19:00. No papel vegetal, por cima: na quarta, um carimbo azul incluída, 13:00, fonte I, motivo esquecimento, pedida por Paula, aprovada por Renata; na quinta, um risco cinza sobre a marcação 1081, desconsiderada, fonte O, tipo D, motivo duplicidade, tratada pelo RH; a marcação continua visível por baixo. Abaixo, o que o AEJ leva: quarta, E 08:02 O, S 12:00 O, E 13:00 I esquecimento, S 17:01 O; quinta, E 07:59 O, S 12:00 O, D 12:00 O duplicidade, E 13:01 O, S 19:00 O; legenda: E entrada, S saída, D desconsiderada, O original, I incluída. Rodapé: a fita nunca é editada; o tratamento é outra camada, e o AEJ leva as duas. Exemplo fictício.", "caption": "Exemplo fictício: empresa, empregada, números sequenciais, horários e decisões inventados. A marcação original fica na fita; a inclusão e a desconsideração ficam na camada de tratamento, com motivo e autor. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-ponto-cartao-semana.svg", "alt": "Ilustração de um cartão de ponto semanal, com o selo exemplo fictício, de Paula R., auxiliar administrativa, horário contratual 08:00 às 12:00 e 13:00 às 17:00, semana de segunda 09/11 a sexta 13/11/2026. Uma linha por dia, com as quatro marcações, as horas trabalhadas, a variação, o dia apurado e o movimento no banco. Segunda: 07:57, 12:00, 13:00, 17:04 marcada offline e gravada às 17:31; trabalhou 8h07; variação 7 minutos, dentro da tolerância; apurado 8h00; banco zero. Terça: 08:00, 12:00, 12:35, 17:00; trabalhou 8h25; alerta de intervalo de 35 minutos, 25 suprimidos para o RH; apurado 8h25; banco mais 25. Quarta: 08:02, 12:00, 13:00 incluída, 17:01; trabalhou 7h59; apurado 8h00; banco zero. Quinta: 07:59, 12:00, 13:01, 19:00, com uma marcação de 12:00 desconsiderada; trabalhou 10h00; apurado 10h00; banco mais 120. Sexta: 08:00, 12:00, 13:00, 16:00, compensação aprovada; trabalhou 7h00; apurado 7h00; banco menos 60. Totais: 41h25 apuradas contra 40h contratuais; saldo do banco mais 85 minutos, igual a 25 mais 120 menos 60. Uma etiqueta: crédito de 10/11/2026 vence em 10/05/2027, pelo acordo individual escrito do exemplo. Exemplo fictício.", "caption": "Exemplo fictício: jornada, marcações, tolerância, acordo e prazos inventados; não é cálculo de folha nem orientação sobre nenhuma jornada real. O cartão mostra cada conta do dia e o saldo do banco como soma de movimentos com data. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-ponto-raio-geolocalizacao.svg", "alt": "Ilustração de um mapa esquemático, com o selo exemplo fictício, mostrando a marcação de entrada de Diego M., vendedor externo, na segunda 09/11/2026 às 08:10. No centro, o cliente agendado com um círculo de raio de 300 metros; fora do círculo, a 1,4 quilômetro, um alfinete com a posição da marcação e um halo de precisão de 35 metros. Uma etiqueta amarela: fora do raio, ocorrência para a gestora, a marcação não é bloqueada; comprovante emitido. Uma nota da gestora Renata: cliente atendeu em unidade nova, não cadastrada. Abaixo, duas colunas. Guardado: hora da marcação com fuso; posição no instante da marcação e precisão; distância ao cliente agendado; ocorrência e explicação; retenção da posição por 90 dias. Não guardado: trajeto entre clientes; posição fora das marcações; foto do rosto, só o resultado da conferência biométrica; contatos e outros dados do celular. Rodapé: finalidade escrita antes, mínimo necessário, LGPD art. 6º, incisos I e III. Exemplo fictício.", "caption": "Exemplo fictício: empregado, cliente, raio, distâncias e prazo de retenção inventados; não é orientação sobre base legal nem sobre monitoramento de empregados. A localização confere a marcação e vira ocorrência; não impede ninguém de marcar. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261125-gestao-frota-veiculos": [
        {"asset": "./torno-frota-envelope-prazo.svg", "alt": "Ilustração de uma notificação de autuação em forma de envelope com aviso de recebimento, com o selo exemplo fictício, da Exemplo Distribuidora Ltda., veículo V-02. No envelope, carimbos: expedida em 20/10/2026; recebida na portaria em 27/10/2026. Abaixo, uma régua de calendário de 02/10 a 19/11 com marcos: sexta 02/10 às 14h37, infração; terça 20/10, expedição, 18 dias depois; terça 27/10, recebimento, 7 dias no correio; quinta 05/11, Marcos assina; sexta 06/11, protocolo; quinta 12/11, prazo interno; quinta 19/11, prazo impresso na notificação. Um contador grande marca: em 27/10, faltam 23 dias. Ao lado, o cartão da reserva do V-02 em 02/10: Marcos L., retirada 13h05, devolução 17h40, com a infração às 14h37 dentro do intervalo, e a nota: condutor provável, sugestão para o gestor confirmar. Rodapé: sem indicação até 19/11, responde o proprietário; sendo pessoa jurídica, nova multa de 2 vezes a original, CTB art. 257, parágrafo 8º. Exemplo fictício.", "caption": "Exemplo fictício: empresa, veículo, condutor, datas e horários inventados; não é orientação sobre nenhuma multa real. Dos 30 dias contados da expedição, a empresa recebeu a notificação com 23; a reserva mostra quem estava com o carro. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-frota-bomba-consumo.svg", "alt": "Ilustração de uma bomba de combustível, com o selo exemplo fictício, para o caminhão V-01 a diesel da Exemplo Distribuidora Ltda., tanque de 120 litros, faixa de referência de 5,0 a 7,0 quilômetros por litro. O visor da bomba mostra: segunda 16/11, 22h47; 140,0 litros; odômetro digitado 121.420. Ao lado, um tanque desenhado com marca de 120 litros e o excesso de 20 litros em vermelho acima da marca. Abaixo, uma fita de cupom com a conta de cada tanque cheio: 05/11, 120.400 km, ponto de partida; 09/11, 480 km dividido por 80,0 litros, 6,00 quilômetros por litro, dentro da faixa; 13/11, 420 km dividido por 75,0 litros, 5,60, dentro da faixa; 16/11, 120 km dividido por 140,0 litros, 0,86, fora da faixa. Três bandeiras vermelhas: litros acima do tanque, 140 contra 120; consumo fora da faixa, 0,86 contra 5,0 a 7,0; fora do turno, 22h47, turno das 6h às 18h, sem reserva. Uma etiqueta cinza: telemetria, V-01 parado no pátio das 18h12 às 6h40. Rodapé: ocorrência para o gestor, não acusação; o sistema mostra a conta e as fontes. Exemplo fictício.", "caption": "Exemplo fictício: veículo, odômetros, litros, horários e faixa inventados. Cada abastecimento é conferido contra o tanque, o consumo do veículo, o turno e a telemetria; quem conclui é o gestor. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-frota-parabrisa-documentos.svg", "alt": "Ilustração de um para-brisa visto de dentro do carro, com o selo exemplo fictício, no momento da retirada do V-02 por Joana S. em 01/12/2026. Colados no vidro, cinco adesivos de conferência: condutora Joana S., CNH categoria B, compatível com o veículo, em verde; validade da CNH 18/12/2026, faltam 17 dias, aviso em amarelo; licenciamento do exercício, venceu em 30/11/2026, CRLV-e novo não registrado, bloqueia, em vermelho; seguro até 15/12/2026, faltam 14 dias, aviso em amarelo; checklist anterior sem avaria pendente, em verde. No painel abaixo do vidro, um visor: retirada bloqueada, motivo licenciamento vencido; alternativa oferecida, V-03, disponível e compatível. Rodapé: cada conferência bloqueia ou avisa conforme a regra escrita da empresa; liberar um bloqueio exige motivo e autor. Exemplo fictício.", "caption": "Exemplo fictício: veículo, condutora, datas e calendário de licenciamento inventados. Na retirada, o sistema confere a condutora e o veículo ao mesmo tempo; o licenciamento vencido bloqueia, e os vencimentos próximos só avisam. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261125-controle-epi-ficha-entrega": [
        {"asset": "./torno-epi-recibo-entrega.svg", "alt": "Ilustração de um recibo de entrega de EPI em forma de canhoto destacável, com o selo exemplo fictício. Cabeçalho: Exemplo Metalúrgica Ltda., ficha de EPI, linha 5. Campos em caixas: empregado, Carlos M., matrícula 0457; função na data, operador de prensa, matriz prensas versão 3; EPI, luva anticorte, tamanho 10, 1 par; CA EX-207, situação vencido em 10/11/2026, com um carimbo amarelo: CA vencido após a compra; lote L-1020, recebido em 20/10/2026, com CA válido nessa data, validade do fabricante 08/2029; motivo, troca periódica de 15 dias; entregue em 18/11/2026 às 07h12, no almoxarifado central, por Ana P.; identificação, biometria digital, conferida; devolução do par anterior, descarte; próxima troca, 03/12/2026. No canhoto destacado: a linha não é editada; correção só por estorno ligado. Abaixo, duas verificações, duas datas: CA válido no recebimento, em 20/10, sim; validade do fabricante na entrega, em 18/11, sim; entrega permitida, conforme decisão registrada do SST. Exemplo fictício.", "caption": "Exemplo fictício: empresa, empregado, CA, lote e datas inventados. A linha da ficha guarda as duas validades, a do CA, conferida no recebimento do lote, e a do equipamento na entrega, e a decisão do SST sobre o lote. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-epi-silhueta-mudanca-funcao.svg", "alt": "Ilustração de uma silhueta de trabalhador de frente, com o selo exemplo fictício, mostrando a mudança de função de Carlos M. No topo, duas caixas ligadas por uma seta: até 22/11, operador de prensa, matriz versão 3; desde 23/11, auxiliar de solda, matriz versão 2. Etiquetas coloridas ligadas por linhas às partes do corpo. À esquerda: óculos de proteção, continua, troca por dano; protetor auricular, continua, próxima troca 03/12; luva anticorte, sai, devolvida para descarte, troca de 03/12 cancelada; calçado de segurança, continua, troca por dano ou desgaste. À direita: máscara de solda, entra, troca por dano; respirador PFF2, entra, troca a cada 7 dias, treinamento antes, com bloqueio na entrega; avental de raspa, entra, troca por dano; luva de raspa, entra, troca em 23/12. Legenda de cores: verde entra, cinza continua, vermelho sai. Rodapé: as três listas nascem da comparação entre as duas matrizes na data da mudança; o que sai tem as trocas programadas canceladas. Exemplo fictício.", "caption": "Exemplo fictício: funções, matrizes, EPIs e datas inventados; não é recomendação de EPI para nenhuma atividade real. A mudança de função gera três listas, e o que sai tem as trocas programadas canceladas. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-epi-escaninhos-tamanhos.svg", "alt": "Ilustração de um armário de almoxarifado com dois escaninhos, com o selo exemplo fictício, para a luva anticorte da Exemplo Metalúrgica Ltda., previsão de 30 dias feita em 25/11/2026, até 24/12. Escaninho tamanho 9: 30 pares em estoque, 22 trocas programadas, sobram 8, em verde. Escaninho tamanho 10: 10 pares em estoque, 14 trocas programadas, faltam 4, em vermelho; uma fila de etiquetas com as datas das trocas de tamanho 10: 25/11, 26/11, 27/11, 06/12, 07/12, 08/12, 09/12, 10/12, 11/12, 12/12, até aqui com par; 21/12, 22/12, 23/12 e 24/12 sem par. Embaixo, uma faixa cinza com o total: 40 pares contra 36 trocas, parece suficiente; e um carimbo: o total esconde a falta. Rodapé: alerta por modelo e tamanho, com a data da primeira troca sem estoque, 21/12. Exemplo fictício.", "caption": "Exemplo fictício: quantidades, tamanhos e datas inventados. O saldo total de luvas cobre as trocas do mês; o do tamanho 10, não. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261124-requisicao-cotacao-compras": [
        {"asset": "./torno-compras-envelopes-abertura.svg", "alt": "Ilustração da abertura das propostas da cotação COT-0088 da Exemplo Caldeiraria Ltda., com uma linha do tempo no topo: convite na sexta 27/11; prazo de resposta na quarta 02/12 às 17h00; abertura na quinta 03/12. Antes do prazo, três envelopes lacrados com cadeado: Alfa, pelo portal; Beta, por e-mail com PDF; Gama, pela planilha do convite. A tela do comprador antes do prazo mostra só: 3 propostas recebidas, preços fechados. Depois do prazo, os três envelopes abertos mostram o total nominal: Alfa R$ 10.625,76, Beta R$ 10.752,00, Gama R$ 10.324,32. Uma faixa vermelha registra a Delta Aços, que respondeu na quinta 03/12 às 08h10, com um carimbo: fora do prazo; registrada, fora do mapa. Rodapé: nenhum fornecedor vê o preço do outro; reabrir o prazo é para todos, com motivo. Exemplo fictício.", "caption": "Exemplo fictício: fornecedores, canais, horários e valores inventados. Antes do prazo, o sistema sabe que a proposta chegou, mas ninguém vê os preços lado a lado. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-compras-balanca-propostas.svg", "alt": "Ilustração de três balanças de pratos, de cima para baixo, comparando duas propostas da cotação COT-0088 da Exemplo Caldeiraria Ltda. para 48 chapas de aço de 2 mm, com 31,40 kg por chapa no cadastro. Em cada balança, o prato mais baixo é o mais caro. Balança 1, preço como veio: Aços Alfa, R$ 7,05 por quilo; Beta Metais, R$ 219,00 por chapa; a balança está travada, com a etiqueta unidades diferentes, não compara. Balança 2, na mesma base, com frete: Alfa, R$ 10.625,76, frete CIF incluso; Beta, R$ 10.752,00, com R$ 240,00 de frete FOB; o prato da Beta desce, Beta mais cara por R$ 126,24. Balança 3, com o prazo de pagamento a 1,5% ao mês: Alfa, 28 dias, R$ 10.479,13; Beta, 63 dias, R$ 10.424,87; o prato da Alfa desce, e a Beta passa a ser a referência, por R$ 54,26. Abaixo, a Gama Distribuidora, R$ 10.324,32, fora da balança: entrega em 22/12, depois da necessidade de 14/12. Rodapé: abaixo de cerca de 1,04% ao mês, a Alfa volta a ser a referência; a taxa é parâmetro do financeiro. Exemplo fictício.", "caption": "Exemplo fictício: empresa, fornecedores, preços, prazos e taxa inventados. A mesma cotação dá três ordens diferentes conforme a base de comparação, e a escolha depende de parâmetros escritos. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-compras-escada-alcadas.svg", "alt": "Ilustração de uma escada de alçadas da Exemplo Caldeiraria Ltda., com três degraus que sobem da esquerda para a direita. Degrau 1, comprador, até R$ 5.000. Degrau 2, gerente de suprimentos, até R$ 20.000. Degrau 3, diretor, acima de R$ 20.000. No topo, uma caixa com o PC-1207 mais o PC-1208, do frete, R$ 10.512,00 mais R$ 240,00, valor da decisão R$ 10.752,00, aprovado pelo gerente vendo o mapa; uma seta tracejada liga a caixa ao degrau 2. Abaixo da escada, uma caixa diz o que sobe a compra um degrau: escolha diferente da referência; menos propostas que o mínimo; aumento de preço depois de aprovar. Outra caixa, a porta lateral da emergência: até R$ 3.000, declarada pelo gestor; aprovação depois, em 1 dia útil; PC-1211, R$ 1.380, em 10/12, aprovado em 11/12. Rodapé: dividir a compra não muda o degrau. Exemplo fictício.", "caption": "Exemplo fictício: faixas, valores e pedidos inventados. A alçada olha o valor da decisão, e algumas situações sobem a compra um degrau. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261124-ordem-servico-assistencia-tecnica": [
        {"asset": "./torno-os-anatomia-ordem.svg", "alt": "Ilustração de uma ordem de serviço em vista explodida, oito camadas empilhadas, da OS-2026-0417 da Exemplo Refrigeração e Climatização Ltda., cada camada com quem preenche e quando. 1, abertura e triagem, pela atendente, terça 01/12: Cliente Beta, pessoa física; split de 12.000 BTU; sintoma relatado, não gela; visita na quarta 02/12, de manhã. 2, diagnóstico, pelo técnico, quarta 02/12: vazamento na conexão da condensadora; capacitor fraco; 3 fotos anexadas. 3, orçamento O-0417, versão 1, que o técnico emite e o sistema congela: mão de obra, 2,5 horas vezes R$ 140,00, igual a R$ 350,00; capacitor, R$ 48,00; gás, 1,2 kg vezes R$ 95,00, igual a R$ 114,00; porca flare, R$ 22,50; total R$ 534,50; válido até sábado 12/12; execução em 04/12; Pix. 4, aprovação do orçamento, pela cliente, quinta 03/12 às 19h48, pelo link, versão 1, que fica gravada. 5, execução, pelo técnico, sexta 04/12: capacitor 1, porca 1, gás 1,4 kg aplicado e 1,2 kg cobrado; baixa no estoque do veículo V2; deslocamento de 30 minutos e trabalho de 2 horas e 30. 6, aceite do serviço, pela cliente, às 16h12: assinatura na tela e 4 fotos. 7, fechamento, pelo financeiro: NFS-e do serviço, R$ 350,00; NF-e de peças e materiais, R$ 184,50, por orientação do contador. 8, garantia, calculada pelo sistema pelas regras escritas da empresa: legal de 90 dias, até 04/03/2027; contratual de mais 90 dias, até 02/06/2027. No rodapé: cada camada guarda quem, quando e o que mudou. Exemplo fictício.", "caption": "Exemplo fictício: empresa, cliente, equipamento, valores e datas inventados. Cada camada da ordem de serviço tem quem preenche e quando, e o orçamento aprovado fica congelado na versão que o cliente viu. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-os-mapa-dia-tecnico.svg", "alt": "Ilustração de um bairro em grade, visto de cima, com o dia do técnico T1 da Exemplo Refrigeração e Climatização Ltda. na sexta-feira 04/12/2026, das 8h às 17h. Da base, uma rota azul de 40 minutos leva ao ponto 1, a OS-0415, limpeza de contrato num condomínio; outra de 40 minutos, ao ponto 2, a OS-0416, visita de diagnóstico; outra de 30 minutos, ao ponto 3, a OS-0417; e uma rota tracejada de 40 minutos volta à base. Abaixo, uma régua do dia das 8h às 17h com blocos coloridos na ordem: deslocamento de 40 minutos, espera de 15 minutos na portaria, trabalho de 90, deslocamento de 40, trabalho de 60, almoço de 65, deslocamento de 30, trabalho de 160 com o aceite, deslocamento de 40. Totais: trabalho, 90 mais 60 mais 150 mais 10 de aceite, igual a 310 minutos, 65,26%; deslocamento, 40 mais 40 mais 30 mais 40, igual a 150 minutos, 31,58%; espera, 15 minutos, 3,16%; almoço, 65 minutos, fora da conta. Base de cálculo: 540 menos 65, igual a 475 minutos. Nota: indicador definido, sem meta; o que entra em cada bloco é regra escrita. Exemplo fictício.", "caption": "Exemplo fictício: técnico, ordens, trajetos e minutos inventados. Deslocamento, espera e trabalho saem dos horários apontados na OS, e a conta do indicador usa uma base escrita. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-os-relogio-garantia.svg", "alt": "Ilustração de dois relógios de garantia da Exemplo Refrigeração e Climatização Ltda., cada um uma volta de 180 dias, contada no sentido horário a partir do topo: a metade da direita, azul, é a garantia legal de 90 dias; a metade da esquerda, verde, é a garantia contratual de mais 90 dias, que começa quando a legal termina, conforme o termo escrito. Relógio de cima, OS-2026-0417, conserto do split: início em 04/12/2026, legal até 04/03/2027, fim em 02/06/2027; um marcador vermelho no dia 45, 18/01/2027, reclamação registrada. Relógio de baixo, OS-2026-0417-R1, retorno refeito: início em 19/01/2027, legal até 19/04/2027, fim em 18/07/2027; um marcador vermelho no dia 142, 10/06/2027, coberto. Uma faixa no rodapé diz: 10/06/2027 está fora do relógio da OS original, que acaba em 02/06, e dentro do relógio do retorno, que acaba em 18/07; um relógio por serviço prestado, não um por cliente. Exemplo fictício.", "caption": "Exemplo fictício: datas, prazos e decisões inventados; o modo de contar e de combinar a garantia legal e a contratual é decisão da empresa com o advogado. Cada serviço prestado tem o seu relógio. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261124-certificado-digital-a1-sistema": [
        {"asset": "./torno-certificado-cofre-chaveiro.svg", "alt": "Ilustração de um cofre de segredos aberto, visto de frente, com o certificado CERT-2027 da Distribuidora Exemplo de Ferramentas Ltda. Dentro do cofre, duas gavetas separadas: na gaveta 1, o arquivo A1, no formato PKCS#12, cifrado; na gaveta 2, a senha, cifrada à parte, nunca no mesmo lugar. Ao lado, uma etiqueta com o cadastro lido do certificado: titular, matriz; CNPJ raiz fictício; série terminando em 9C41; válido de 09/12/2026, 10h05, até 09/12/2027, 10h05, horário de Brasília; usado em NF-e da matriz e da filial, distribuição de DF-e e NFS-e da matriz. Abaixo, quem tem cada chave, com uma chave desenhada para cada papel: serviço de emissão, lê arquivo e senha para assinar e transmitir e funciona sem pessoa por perto; responsável fiscal, carrega arquivo e senha na tela de carga, com segundo fator, e não pode baixar; diretor, aprova a ativação depois do teste e vê só o cadastro; TI, agenda a troca e vê o registro, sem ver a senha. Uma faixa vermelha diz o que ninguém faz: baixar o arquivo de volta, ver a senha, copiar o certificado para outro ambiente. Em seguida, fora do cofre, quatro lugares a evitar, cada um marcado com um X vermelho: pasta compartilhada com senha.txt ao lado; e-mail encaminhado ao fornecedor e ao contador; repositório de código ou arquivo de configuração; computador de uma pessoa, que precisa estar ligado. No fim, num sistema na nuvem: A1, arquivo e senha no cofre, emissão sem pessoa; A3 em token, na mesa de alguém, não serve a servidor na nuvem; A3 em HSM, próprio ou guardado por prestador credenciado, com integração, autenticação e disponibilidade próprias. Exemplo fictício.", "caption": "Exemplo fictício: empresa, certificado, número de série, datas e papéis inventados. O arquivo e a senha ficam separados no cofre, só o serviço de emissão lê os dois, e cada pessoa tem uma chave que faz uma coisa só. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-certificado-arvore-falha.svg", "alt": "Ilustração de uma árvore de diagnóstico em três níveis, de cima para baixo, para a Distribuidora Exemplo de Ferramentas Ltda., que começa em: a NF-e não foi autorizada. Primeiro nível, no sistema: o sistema abriu o certificado e assinou? Se não, falha local: senha errada, arquivo corrompido, vencido pelo relógio do servidor, CNPJ-base de outra empresa, serviço do HSM fora; nada foi enviado à SEFAZ; não repetir; alerta a quem cuida do certificado. Se sim, segundo nível, na rede: a conexão TLS com a SEFAZ completou? Se não, conexão sem código: certificado de transmissão recusado pelo próprio protocolo, cadeia não reconhecida, rede instável ou SEFAZ fora; guardar o detalhe técnico; repetir com intervalo e alertar se persistir. Se sim, terceiro nível, na SEFAZ: que código voltou? Cinco folhas: 280 a 286, certificado de transmissão, alerta crítico, não repetir; 290 a 296, certificado de assinatura, alerta crítico, não repetir; 297 e 298, assinatura fora do padrão ou alterada, defeito do sistema, chamado à TI; 213 e 593, CNPJ-base de outra empresa, o 593 na distribuição de DF-e, bloquear; outros códigos, conteúdo da nota, vai para quem emitiu, fora deste artigo. No rodapé: códigos do Anexo I do manual da NF-e modelo 77, versão de agosto de 2026; confirme no manual do modelo e da versão que o seu sistema implementa. Exemplo fictício.", "caption": "Exemplo fictício: a árvore é uma recomendação de modelagem; os códigos vêm do Anexo I do manual da NF-e de alienação de bens imóveis (modelo 77), de agosto de 2026, e precisam ser conferidos no manual do modelo e da versão que o seu sistema implementa. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-certificado-linha-validade.svg", "alt": "Ilustração de uma linha do tempo horizontal, do fim de novembro de 2026 a meados de janeiro de 2027, horário de Brasília, com dois trilhos de validade da Distribuidora Exemplo de Ferramentas Ltda. Trilho de cima, CERT-2026, série terminando em 7F3A: barra azul até a segunda-feira 14/12; dali em diante, barra hachurada de reserva, com a nota volta com um clique, até o marcador vermelho vence, 14/01, 16h20. Sobre ele, cinco marcadores de alerta: D−45, em 30/11, enviado; D−30, D−15, D−7 e D−1, em 15/12, 30/12, 07/01 e 13/01, riscados, cancelados porque o certificado saiu de uso. Trilho de baixo, CERT-2027, série terminando em 9C41: barra verde que começa em 09/12 e segue além do quadro. Uma seta grossa em 14/12 desce do trilho de cima para o de baixo, marcando a ativação. Uma faixa amarela entre 09/12 e 14/01 diz: os dois válidos, dá para trocar sem parar. Quatro eventos numerados, explicados abaixo: 1, quarta 09/12, CERT-2027 emitido às 10h05; carga com senha errada recusada, sem mudança em produção; com a senha certa, entra em teste; homologação de NF-e da matriz e da filial, distribuição de DF-e e NFS-e. 2, quinta 10/12, diretor aprova a ativação e a TI agenda. 3, segunda 14/12, às 6h30, CERT-2027 ativo e CERT-2026 em reserva; primeiras notas às 6h52, matriz, e 7h10, filial. 4, sexta 15/01, o CERT-2026 venceu na véspera às 16h20; arquivo e senha saem do cofre, o cadastro fica. No rodapé, próximo alerta: segunda 25/10/2027, 45 dias antes do vencimento do CERT-2027, em 09/12/2027, 10h05. Exemplo fictício.", "caption": "Exemplo fictício: certificados, números de série, datas, horários e janelas de alerta inventados. O certificado novo é testado e ativado enquanto o antigo ainda vale, e o antigo fica de reserva até vencer. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261123-boleto-registro-remessa-retorno": [
        {"asset": "./torno-boleto-anatomia.svg", "alt": "Ilustração de um boleto fictício anatomizado, com nove campos numerados. No topo, um aviso: só vai ao cliente depois do retorno 02, entrada confirmada. No boleto, do Banco Exemplo, marcado como não é um boleto válido: 1, beneficiário Indústria Exemplo de Embalagens Ltda., com CNPJ fictício; 2, convênio 7654321 e carteira 17; 3, pagador Cliente Alfa Comércio Ltda., com CNPJ e endereço do cadastro; 4, seu número T-8801; 5, nosso número 0000001041-3, com a nota de que o dígito 3 é calculado por módulo 11, pesos 2 a 9; 6, vencimento 15/12/2026 e valor R$ 4.850,00; 7, instruções que vão ao banco: desconto de R$ 48,50 até 04/12/2026, multa de 2% após o vencimento, juros de R$ 1,61 por dia de atraso, não protestar, baixar 30 dias após o vencimento, não aceita valor divergente; 8, QR Code Pix ilustrativo, não escaneável, com txid; 9, linha digitável e código de barras ilustrativos e inválidos. Abaixo, a legenda de onde vem cada campo: 1 e 2, da empresa e do contrato com o banco; 3 e 7, do cadastro do cliente e da condição comercial; 6, do título de contas a receber; 4, 5, 8 e 9, gerados pelo sistema e nunca reaproveitados. Um quadro tracejado em vermelho diz: gerar o PDF não é registrar; entre a remessa e o retorno, o título está enviado ao banco. Exemplo fictício.", "caption": "Exemplo fictício: empresa, banco, convênio, cliente, números e instruções inventados; linha digitável, código de barras e QR Code ilustrativos e inválidos. Cada campo tem origem definida, e o boleto só sai depois do registro confirmado. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-boleto-matriz-retorno.svg", "alt": "Ilustração de uma matriz de ocorrências do arquivo de retorno por ação do sistema, para a Indústria Exemplo de Embalagens Ltda. As linhas são as ocorrências: 02 entrada confirmada; 03 entrada rejeitada; 06 liquidação com valor igual ao esperado; 06 liquidação com valor diferente; 09 baixa pedida pela empresa; 09 baixa por decurso; 17 liquidação após baixa; 26 instrução rejeitada; 28 tarifa; ocorrência desconhecida; e arquivo já importado. Abaixo de cada ocorrência aparece o estado do título, e as colunas são: boleto ao cliente; baixa no contas a receber; fila do financeiro; aviso; cada célula marca faz, proibido fazer ou não se aplica. Exemplos: 02 deixa o título registrado e libera o boleto; 03 deixa o título rejeitado, para correção, e vai para a fila; 06 igual baixa como pago; 06 diferente fica pago com diferença e vai para a fila; 09 pedida confirma a baixa pedida; 09 por decurso deixa o título vencido sem boleto, sem baixa no contas a receber, com aviso à cobrança; 17 gera crédito a decidir na fila, sem segunda baixa; 26 desfaz a alteração e avisa quem pediu; 28 lança tarifa sem mexer no título; desconhecida vai para a fila; arquivo já importado não altera nada e é registrado. Uma faixa vermelha destaca: baixa não é pagamento. Exemplo fictício; códigos como os de manuais públicos de bancos.", "caption": "Exemplo fictício: códigos parecidos com os de manuais públicos, ações escolhidas pela empresa do exemplo. Cada ocorrência tem uma ação escrita, inclusive a desconhecida e o arquivo repetido. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-boleto-trilhos-titulo.svg", "alt": "Ilustração em dois trilhos verticais paralelos, à esquerda o sistema da Indústria Exemplo de Embalagens Ltda. e à direita o Banco Exemplo, com setas horizontais de ida (remessa) e de volta (retorno) entre eles, como uma caixa de correio. Acima, a vida do título T-8805 do Cliente Épsilon, R$ 980,00, vencimento 04/12/2026: em 01/12, remessa REM-0124, entrada; em 02/12, retorno 02, entrada confirmada, e o boleto vai ao cliente; em 03/12, o cliente paga R$ 980,00 por transferência, fora do boleto, e o sistema manda na REM-0126 o pedido de baixa 02, título em baixa solicitada; em 04/12, retorno 09, baixa confirmada, título pago por transferência; em 07/12, retorno 17, liquidação após baixa, R$ 980,00, porque o cliente tinha agendado o boleto; o sistema não baixa de novo e registra crédito do cliente de R$ 980,00, com tarefa para o financeiro decidir entre devolver e compensar. Abaixo, uma faixa menor com o T-8804 do Cliente Delta, R$ 1.275,40: retorno 03 em 02/12, entrada rejeitada por CEP do pagador inválido, boleto retido; CEP corrigido e reenvio na REM-0125; retorno 02 em 03/12, boleto liberado. Exemplo fictício.", "caption": "Exemplo fictício: títulos, remessas, retornos, datas e valores inventados; a baixa pedida e a liquidação que chega depois dela aparecem como mensagens separadas entre os dois trilhos. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261123-separacao-pedidos-expedicao": [
        {"asset": "./torno-separacao-planta-rota.svg", "alt": "Ilustração de uma planta baixa vista de cima do armazém da Distribuidora Exemplo de Materiais Elétricos Ltda., com três ruas de prateleiras, A, B e C, divididas em prédios de 01 a 08, a bancada de conferência e as docas 1 e 2. Uma linha tracejada azul mostra a rota da separação em lote da onda O-1202-1, liberada às 10h40 de 02/12/2026: sai da bancada, percorre a rua A da esquerda para a direita, a rua B da direita para a esquerda e a rua C da esquerda para a direita, e volta à bancada. Quatro paradas numeradas, em ordem de endereço: 1, A-03-1, verde; 2, B-07-2, vermelha; 3, C-01-1, verde; 4, C-04-3, amarela, com a nota de que no nível 3 do prédio C-04 fica a TM-10 e no nível 4, logo acima, a TM-20, de caixa igual. Na legenda abaixo da planta: 1, cabo CB-25, 6 rolos lidos um a um, sem divergência; 2, disjuntor DJ-32, sistema 18, encontrado 15, falta de 3, endereço vai para contagem, o PV 5103, que não aceita parcial, recebe 6, e o PV 5101 recebe 9 de 12, corte de R$ 115,50, 6,56%, abaixo do limite de 10%, segue com aviso ao comercial; 3, fita FT-20, 6 pacotes de 10, cada pacote lido pelo código, sem divergência; 4, tomada TM-10, primeira caixa lida e quantidade 5 digitada, e a quinta caixa pode vir do nível de cima, C-04-4, a TM-20. Um quadro compara: por pedido, 7 paradas, uma por linha de pedido; em lote, 4 paradas mais a divisão por pedido na bancada. No rodapé: 134 unidades pedidas, 131 separadas. Exemplo fictício.", "caption": "Exemplo fictício: armazém, endereços, itens, saldos e quantidades inventados; a rota segue a sequência de endereços, e a falta e o risco de item vizinho aparecem onde acontecem. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-separacao-raio-x-volume.svg", "alt": "Ilustração em estilo raio-x do volume 2 de 2 do PV 5101, Cliente Alfa, da Distribuidora Exemplo de Materiais Elétricos Ltda., uma caixa P vista através das paredes sobre uma balança que marca 3,32 kg. Dentro da caixa aparecem 8 disjuntores DJ-32 e 20 fitas FT-20; o nono disjuntor ficou na bancada, com um círculo vermelho. Ao lado, a tela da conferência mostra nove leituras de DJ-32 e o total contado de 9, com a nona leitura em vermelho: mesma unidade da oitava, leitura dupla; e FT-20 em 2 pacotes de 10. Abaixo, a conta do peso esperado: 9 vezes 0,24 kg, mais 20 vezes 0,05 kg, mais a tara de 0,40 kg, igual a 3,56 kg; tolerância de 0,07 kg, o maior entre 2% (0,0712 kg) e 0,05 kg; faixa aceita de 3,49 a 3,63 kg, desenhada numa régua de 3,20 a 3,70 kg. Primeira pesagem às 11h40: 3,32 kg, 0,24 kg a menos, 6,74%, fora da tolerância, volume não fecha. Depois da reabertura com motivo: 3,55 kg, 0,01 kg a menos, dentro da tolerância, volume fechado. Embaixo, a etiqueta de volume: VOL-5101-2, volume 2 de 2, PV 5101, Cliente Alfa, Transportes Exemplo, 3,55 kg, NF-e 8.801 preenchida depois da emissão, com barras ilustrativas. Exemplo fictício.", "caption": "Exemplo fictício: itens, pesos, taras, tolerância e etiqueta inventados; a leitura dupla passa pela contagem do leitor, e o peso esperado a acusa. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-separacao-docas-romaneio.svg", "alt": "Ilustração vista de cima de duas docas da Distribuidora Exemplo de Materiais Elétricos Ltda. em 02/12/2026. Doca 1, caminhão da Transportes Exemplo, romaneio R-0412, coleta às 16h00: três caixas lidas, VOL-5101-1, PV 5101, NF-e 8.801, 13,12 kg; VOL-5101-2, PV 5101, NF-e 8.801, 3,55 kg; VOL-5102-1, PV 5102, NF-e 8.802, 11,30 kg; total 3 volumes, 27,97 kg pesados contra 27,96 kg calculados; romaneio fechado às 15h50. Doca 2, carro próprio, rota Centro, romaneio R-0413: VOL-5103-1, PV 5103, NF-e 8.803, 3,86 kg, saída às 13h30. Abaixo, dois quadros tracejados em vermelho mostram simulações: o volume VOL-5103-1 lido na doca 1, no romaneio R-0412, é recusado como volume de outro romaneio, porque pertence ao R-0413, rota Centro; e um volume sem NF-e autorizada é recusado na leitura da doca. Exemplo fictício.", "caption": "Exemplo fictício: docas, veículos, volumes, notas, pesos e horários inventados; cada volume entra no veículo por leitura, contra o romaneio gerado do que foi conferido. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261123-conferencia-nfe-pedido": [
        {"asset": "./torno-conferencia-tres-vias-sobrepostas.svg", "alt": "Ilustração de três documentos sobrepostos em transparência, levemente deslocados, da Metalúrgica Exemplo Ltda.: atrás, o pedido de compra PC 7712, de 02/11/2026, com frete por conta do fornecedor; no meio, o recebimento de 09/11/2026; na frente, a NF-e 45.210, autorizada em 06/11/2026. Cinco faixas horizontais atravessam os três documentos e alinham os campos que precisam bater; abaixo delas, um quadro de totais. Faixa 1, barra SAE 1045, código do fornecedor SAE1045-1POL ligado ao código interno MP-1045-25: pedido 1.200 kg a R$ 9,80; recebido 610 kg; nota 615 kg a R$ 10,00 com 2% de desconto, R$ 9,80 líquido. Marcação vermelha: 5 kg a mais, 0,82%, acima de 0,5%, R$ 49,00. Faixa 2, óleo de corte, OCS-BD20 ligado a OL-020, fator 20: pedido 200 L a R$ 18,50; recebido 10 baldes, 200 L; nota 10 BD a R$ 370,00, R$ 18,50 por litro. Marcação verde. Faixa 3, pastilha, CNMG-CX10 ligado a FE-CNMG, fator 10: pedido 100 UN a R$ 42,00; recebidas 6 caixas, 60 UN; nota 6 CX a R$ 430,00, R$ 43,00 por unidade. Marcação vermelha: 2,38% acima de 1%, R$ 60,00. Faixa 4, frete: pedido por conta do fornecedor; nota R$ 180,00 destacado. Marcação vermelha, R$ 180,00. Faixa 5, pedido na nota: xPed 7712, itens 1 a 3, verde. Quadro de totais: nota R$ 12.487,00; valor que bate R$ 12.198,00; diferença R$ 289,00, igual a 49 mais 60 mais 180. Um carimbo indica nota inteira bloqueada para pagamento, com três motivos. Exemplo fictício.", "caption": "Exemplo fictício: empresas, pedido, nota, códigos, fatores, quantidades e preços inventados; os campos que precisam bater estão alinhados nas três vias, e cada divergência tem valor e motivo próprios. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-conferencia-balanca-quantidade.svg", "alt": "Ilustração de duas balanças de pratos lado a lado, para a barra SAE 1045 da NF-e 45.210 da Metalúrgica Exemplo Ltda. Em cada balança, o prato da esquerda leva o recebido e o da direita, o faturado; abaixo do braço, um mostrador em arco com uma faixa verde de tolerância de 0,5% para mais. Balança da esquerda, 09/11/2026: recebido 610 kg, faturado 615 kg, diferença de 5 kg, 0,82%; o ponteiro passa da faixa verde, que vai até 3,05 kg, e cai na zona vermelha: bloqueado. Balança da direita, 10/11/2026, depois da repesagem com motivo tara do palete descontada em dobro: recebido 612 kg, faturado 615 kg, diferença de 3 kg, 0,49%; o ponteiro fica dentro da faixa verde, que vai até 3,06 kg: dentro da tolerância, liberado sem ação manual. Abaixo, uma terceira balança menor mostra o acumulado do item no fim do pedido: recebido 1.202 kg em duas entregas, faturado 1.205 kg em duas notas, diferença de 3 kg, 0,25%, dentro do limite de 6,01 kg. Nota: o recebimento de 610 kg continua no histórico. Exemplo fictício.", "caption": "Exemplo fictício: pesos, datas e motivo inventados; a mesma nota passa ou não pela tolerância conforme o recebimento registrado, e a correção do recebimento fica no histórico. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-conferencia-matriz-tolerancias.svg", "alt": "Ilustração de uma matriz de conferência em forma de mapa de calor, da Metalúrgica Exemplo Ltda., com seis linhas e seis colunas. Linhas: NF-e 45.210 barra; NF-e 45.210 óleo; NF-e 45.210 pastilha; NF-e 45.210 frete; NF-e 45.388 barra; NF-e 45.388 pastilha. Colunas: vínculo com o pedido; de-para e fator; quantidade contra recebido; preço líquido contra pedido; frete e condição; resultado. Células verdes para conferido, amarelas para dentro da tolerância depois de correção, vermelhas para bloqueado, cinza para não se aplica. NF-e 45.210 barra: vínculo verde, de-para verde, quantidade amarela com 615 contra 612, 0,49%, e um quadro abaixo explica que em 09/11, com 615 contra 610, 0,82%, ela estava vermelha; preço verde a R$ 9,80 líquido, frete cinza, resultado amarelo. Óleo: tudo verde, fator 20, R$ 18,50 por litro. Pastilha: de-para verde com fator 10, quantidade verde 60 contra 60, preço vermelho R$ 43,00 contra R$ 42,00, 2,38%, resultado vermelho, R$ 60,00. Frete: preço cinza, frete vermelho R$ 180,00 em pedido com frete do fornecedor. NF-e 45.388 barra: verde, 590 contra 590 e acumulado 1.205 contra 1.202, 0,25%. NF-e 45.388 pastilha: verde, R$ 42,00. Um quadro abaixo lembra que sem o fator 10 a célula da pastilha mostraria R$ 430,00 contra R$ 42,00, 923,81% acima. No rodapé: NF-e 45.210 bloqueada em 09/11 por R$ 289,00; liberada em 12/11 com acerto de R$ 240,00; valor a pagar R$ 12.247,00. NF-e 45.388 liberada sem ação manual, R$ 7.462,00. Exemplo fictício.", "caption": "Exemplo fictício: notas, itens, tolerâncias e resultados inventados; cada célula é uma comparação com regra escrita, e a cor muda quando o recebimento é corrigido ou o acerto é registrado. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261120-reajuste-contratos": [
        {"asset": "./torno-reajuste-ampulheta-defasagem.svg", "alt": "Ilustração de uma ampulheta com o caminho do índice até a fatura do contrato A da Manutenção Exemplo Ltda., com aniversário em 01/12/2026. No bulbo de cima, outubro de 2026, o mês de referência, com preços coletados ao longo do mês. No gargalo, em azul, um dado real: o IBGE divulgou o IPCA de outubro em 12/11. No bulbo de baixo, do exemplo: em 16/11 a rotina calcula e envia o aviso, e em 01/12 sai a fatura reajustada. À direita, duas perguntas em vermelho: se o contrato pedisse o índice até novembro, o de novembro só sai em 11/12, segundo a Agência Gov, e a fatura de 01/12 não teria o número; com aviso de 30 dias, em 01/11 ainda não existiria o IPCA de outubro, e a janela teria de acabar antes de outubro. Abaixo, a regra do exemplo: sem índice na base, a rotina não calcula, alerta o financeiro e não usa o último número. Na parte de baixo, outro dado real: o IGP-M de novembro de 2025, segundo a FGV IBRE, teve coleta de 21/10 a 20/11/2025 e foi divulgado em 27/11. Uma nota diz que cada índice tem período de coleta e data de divulgação próprios, e que as datas de divulgação vêm da Agência Gov, de 12/11/2026, e da FGV IBRE, de 27/11/2025; rotina, aviso e fatura são do exemplo. Exemplo fictício com datas de divulgação reais.", "caption": "Exemplo fictício com datas reais de divulgação (IPCA de outubro de 2026 e data prevista do IPCA de novembro, segundo a Agência Gov; IGP-M de novembro de 2025, segundo a FGV IBRE); contrato, rotina e aviso inventados. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-reajuste-conta-certo-errado.svg", "alt": "Ilustração que compara, lado a lado, quatro contas para o reajuste do contrato A da Manutenção Exemplo Ltda., mensalidade R$ 2.480,00. No alto, as 12 taxas mensais inventadas, de novembro de 2025 a outubro de 2026, em porcentagem: 0,31; 0,42; 0,27; 0,55; 0,38; 0,29; 0,21; 0,18; −0,06, em vermelho; 0,15; 0,47 e 0,33. À esquerda, em verde, a conta pela regra do contrato: multiplicar os 12 fatores, 1,0031 × 1,0042 × … × 1,0033 = 1,035552…; acumulado de 3,555…%, arredondado a duas casas, 3,56%; 2.480,00 × 1,0356 = 2.568,288, ou R$ 2.568,29. À direita, em vermelho, três contas diferentes: somar as taxas dá 3,50% e R$ 2.566,80, R$ 1,49 a menos por mês; usar o fator cheio, sem arredondar o percentual, dá R$ 2.568,17, R$ 0,12 a menos; outubro digitado como 0,38 dá 3,61% e R$ 2.569,53, R$ 1,24 a mais. Abaixo: o fator cheio não é errado em si, é diferente da regra deste contrato, que manda arredondar o percentual a duas casas; escreva a regra, e o sistema e a planilha de conferência precisam chegar ao mesmo centavo. Taxas inventadas, não são o IPCA publicado pelo IBGE. Exemplo fictício.", "caption": "Exemplo fictício: taxas inventadas, que não são o IPCA publicado; o arredondamento do percentual a duas casas é regra do contrato do exemplo, não recomendação. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-reajuste-calendario-aniversarios.svg", "alt": "Ilustração de um calendário vertical de 16 meses, de novembro de 2025 a fevereiro de 2027, com três colunas, uma para cada contrato da Manutenção Exemplo Ltda. Contrato A, IPCA, mensalidade R$ 2.480,00, aniversário em 01/12: uma barra azul marca a janela de 12 meses do índice, de novembro de 2025 a outubro de 2026, o último mês sendo M−2; em novembro de 2026, uma caixa amarela, 16/11, aviso; em dezembro, uma caixa preta, 01/12, fatura. Contrato B, IGP-M, R$ 1.150,00, aniversário em 01/01: janela de dezembro de 2025 a novembro de 2026; aviso em 15/12; fatura em 01/01/2027. Contrato C, IPCA, R$ 3.900,00, aniversário em 01/02: janela de janeiro a dezembro de 2026; uma caixa vermelha em junho de 2026 marca 16/06, troca de plano; aviso em 15/01/2027; fatura em 01/02/2027. Uma legenda diz que amarelo é a rotina que calcula e envia o aviso e preto é a fatura. Abaixo, os resultados: A, 3,56%, R$ 2.568,29; B, −0,85%, mantém R$ 1.150,00 pela regra do contrato; C, 4,20% sobre R$ 4.600,00, R$ 4.793,20; e a nota de que a troca de plano em junho não muda a data-base de C. Taxas inventadas, não são os índices publicados. Exemplo fictício.", "caption": "Exemplo fictício: empresa, contratos, valores e taxas inventados; a regra de usar os 12 meses terminados dois meses antes do aniversário é escolha do contrato do exemplo, não recomendação. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-reajuste-indice-negativo-trilhos.svg", "alt": "Ilustração de uma bifurcação de trilhos para o contrato B da Manutenção Exemplo Ltda., IGP-M, mensalidade R$ 1.150,00, aniversário em 01/01. No topo, o acumulado de 12 meses, −0,85%, inventado. O trilho se divide em três. Trilho 1, aplica a redução: 1.150,00 × 0,9915 = 1.140,225, ou R$ 1.140,23. Trilho 2, em verde e marcado como regra do contrato B, mantém o valor: reajuste registrado de 0%, acumulado de −0,85%, R$ 1.150,00. Trilho 3, mantém e compensa: agora R$ 1.150,00, e o próximo ano leva o −0,85% junto. Abaixo, o trilho 3 no ano seguinte, com +5,00% inventado: 1.150,00 × 1,05 × 0,9915 = R$ 1.197,24, não R$ 1.207,50. Um quadro azul traz um dado real: o IGP-M acumulado em 12 meses até novembro de 2025 foi de −0,11%, segundo a FGV IBRE, em divulgação de 27/11/2025. No rodapé, em vermelho: qual trilho vale é o contrato que diz; o sistema não escolhe, e a dúvida vai para o advogado. Exemplo fictício.", "caption": "Exemplo fictício: contrato, acumulado e valores inventados, com um dado real do IGP-M (FGV IBRE); os três trilhos são possibilidades de redação, e qual vale é decisão do contrato com o advogado, não recomendação. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261120-regua-cobranca": [
        {"asset": "./torno-cobranca-mostrador-regua.svg", "alt": "Ilustração de um mostrador circular com a régua de cobrança do título T-4512, de R$ 4.800,00, do Restaurante Exemplo Ltda., cliente da Distribuidora Exemplo Ltda. Cada marca do anel equivale a cerca de um dia. No topo, o vencimento original, segunda-feira 02/11/2026, feriado de Finados, marcado em amarelo, com a indicação de que o vencimento efetivo passa para terça-feira, 03/11. No sentido anti-horário, antes do topo, o lembrete de 30/10, D−3, por e-mail. No sentido horário, depois do topo: 04/11, D+1, e-mail e WhatsApp; 09/11, D+5, porque 08/11 é domingo; 13/11, D+10, marcado com um X vermelho e a nota não sai; 18/11, D+15, telefonema, e 03/12, D+30, fila de decisão humana, os dois tracejados como cancelados. Um traço vermelho corta o anel em 13/11, antes do D+10: no centro, a explicação, pago em 13/11 às 7h50 por Pix, baixa às 8h30 pela conciliação, 10 dias de atraso, R$ 4.912,00. O anel fica cinza depois do pagamento e há um trecho marcado como fora da régua. Abaixo, as regras do exemplo: vencimento em dia não útil passa ao dia útil seguinte; toque depois do vencimento que cai em dia não útil vai para o dia útil seguinte; envio só em dia útil, das 9h às 18h; no máximo um toque por cliente por dia, com os títulos agrupados; a régua só roda depois da conciliação do dia; o D+30 nunca envia nada e abre uma decisão humana. Exemplo fictício.", "caption": "Exemplo fictício: empresas, título, datas e valores inventados; os dias de cada toque, os canais e os horários são escolhas da empresa do exemplo, não recomendação. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-cobranca-interruptores.svg", "alt": "Ilustração de um quadro com oito interruptores que mudam a régua de cobrança da Distribuidora Exemplo Ltda. Cada interruptor tem o evento, quem o registra e o efeito, em etiqueta colorida. 1, pagamento baixado, registrado pela conciliação: para, régua do título encerrada. 2, pagamento informado, registrado pelo cliente com comprovante: pausa por até 2 dias úteis; sem baixa, vai para a fila. 3, acordo registrado pelo financeiro: pausa até a data; se o acordo for quebrado, a régua retoma. 4, contestação aberta, registrada pelo financeiro ou pelo comercial: pausa só o título contestado. 5, título cancelado, registrado pelo faturamento: para, por nota fiscal cancelada ou devolução total. 6, renegociação, registrada pelo financeiro com alçada: para, o título original sai e o título novo tem régua nova. 7, opt-out de canal, pedido pelo contato do cliente: troca, só aquele canal deixa de ser usado. 8, e-mail que voltou, informado pelo provedor de e-mail: troca, o endereço fica inválido e a régua usa outro canal ou abre uma fila. No rodapé: parar é diferente de pausar, porque a pausa tem data ou condição de volta, e cada acionamento grava quem, quando, por quê e qual título. Exemplo fictício.", "caption": "Exemplo fictício: eventos, efeitos e responsáveis são escolhas da empresa do exemplo; o que importa é que cada interruptor exista, tenha dono e deixe registro. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-cobranca-titulo-corte.svg", "alt": "Ilustração de dois títulos fictícios em corte, com as regras do contrato do exemplo: multa de 2% uma única vez e juros de 1% ao mês, proporcionais aos dias, em mês de 30 dias. Primeiro, o T-4512 do Restaurante Exemplo Ltda., pago em 13/11, como um bloco empilhado: principal de R$ 4.800,00 na base, multa de 2%, R$ 96,00, acima, e juros de 10 dias, R$ 16,00, no topo, com o total de R$ 4.912,00 e a conta 4.800 × 1% × 10/30 = 16,00, atraso de 03/11 a 13/11; as camadas estão fora de escala. Ao lado, dois erros em vermelho: contar o atraso desde 02/11, o feriado, daria 11 dias, juros de R$ 17,60 e total de R$ 4.913,60, R$ 1,60 a mais; e cobrar encargos de quem pagou em 03/11, que deve R$ 4.800,00 sem multa e sem juros. Uma caixa diz que a segunda via emitida em 12/11 para pagamento em 13/11 sai por R$ 4.912,00, porque o valor muda com a data de pagamento pretendida. Abaixo, o T-4521 da Oficina Exemplo Ltda., com pagamento parcial: em 10/11, uma barra com principal de R$ 1.200,00, multa de R$ 24,00 e juros de R$ 2,80, total R$ 1.226,80; abaixo dela, o pagamento de R$ 1.000,00, que pela regra do contrato do exemplo quita primeiro os encargos, R$ 26,80, e depois R$ 973,20 do principal, deixando saldo de R$ 226,80. Em 17/11, juros de 226,80 × 1% × 7/30 = 0,5292, arredondados para R$ 0,53, sem nova multa, e quitação de R$ 227,33. Uma nota diz que a ordem de quitação vem do contrato e deve ser conferida com o advogado. Exemplo fictício.", "caption": "Exemplo fictício: contrato, percentuais, datas e valores inventados; os percentuais e a ordem de quitação são do contrato da empresa do exemplo, não recomendação nem limite legal. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-cobranca-escada-decisao.svg", "alt": "Ilustração de uma escada de quatro degraus, à esquerda, com uma caixa à direita na altura de cada degrau, mostrando quem decide cada passo da cobrança na Distribuidora Exemplo Ltda.; quanto mais alto o degrau, maior o efeito sobre o cliente e menos o sistema decide sozinho. Degrau 1, sistema, por regra aprovada: lembrete D−3 e avisos D+1, D+5 e D+10, segunda via com valor atualizado, parar com a baixa e pausar com acordo ou contestação registrados. Degrau 2, equipe do financeiro: telefonema no D+15, acordo dentro da alçada, registro da contestação e atualização do contato que voltou. Degrau 3, gestor financeiro ou diretoria: acordo fora da alçada, dispensa de multa ou juros e proposta de negativação ou protesto a partir do D+30. Degrau 4, advogado: texto dos avisos, multa e juros, relação de consumo, LGPD, notificação prévia, protesto e cobrança judicial. Abaixo, uma nota em vermelho: negativação e protesto nunca saem de um agendamento; saem de uma decisão registrada, com nome, data e a orientação do advogado anexada. Exemplo fictício.", "caption": "Exemplo fictício: degraus, alçadas e responsáveis são escolhas da empresa do exemplo; em outra empresa, os nomes mudam, mas a escada continua existindo. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261120-apontamento-producao": [
        {"asset": "./torno-apontamento-regua-turno.svg", "alt": "Ilustração de uma régua horária do turno A, das 6h às 14h, da terça-feira 03/11/2026, na Metalúrgica Exemplo Ltda., com quatro faixas horizontais. Primeira faixa, máquina TC-02, OP 8301 operação 20: setup das 6h00 às 6h40; produção das 6h40 às 8h10; parada por quebra de ferramenta das 8h10 às 8h35; produção das 8h35 às 10h00; refeição das 10h00 às 10h30; produção das 10h30 às 13h40; limpeza das 13h40 às 14h00. Segunda faixa, operador 104: setup no TC-02, produção sozinho no TC-02, parada, e depois blocos hachurados de atendimento simultâneo das 8h35 às 10h00 e das 10h30 às 13h40, marcados como divididos meio a meio entre as OPs 8301 e 8305, e limpeza no fim. Terceira faixa, operador 117: setup no TC-02 das 6h00 às 6h40, junto com o 104, e setup do TC-03 das 6h40 às 8h35. Quarta faixa, máquina TC-03, OP 8305: setup das 6h40 às 8h35, produção das 8h35 às 10h00, refeição, produção das 10h30 às 13h40 e limpeza. Uma chave sob os blocos hachurados indica 275 minutos simultâneos, 137,5 para cada ordem. No rodapé, a soma do operador 104: 292,5 minutos na OP 8301, mais 137,5 na OP 8305, mais 20 de limpeza, igual a 450 minutos, a presença. Em destaque, a armadilha: contando o tempo simultâneo inteiro nas duas ordens, seriam 725 minutos em 450 de presença. Abaixo, a mão de obra da OP 8301 no turno: 332,5 minutos, 292,5 do 104 e 40 do 117. Exemplo fictício.", "caption": "Exemplo fictício: turno, máquinas, operadores e horários inventados; a regra de dividir o tempo simultâneo em partes iguais é escolha da empresa do exemplo, não recomendação. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-apontamento-razao-pecas.svg", "alt": "Ilustração de um livro-razão de peças da OP 8301, de 200 eixos EX-40, da Metalúrgica Exemplo Ltda., com linhas por operação e colunas entraram, boas, refugo com motivo e retrabalho. Corte: 202 entraram, 200 boas, 2 refugadas por comprimento de corte. Torneamento turno A em 03/11: 125, 120 boas, 3 refugadas dimensional, 2 para retrabalho por rebarba. Torneamento turno B: 75, 70 boas, 2 refugadas, 3 para retrabalho; uma nota marca o apontamento de 30 peças feito às 15h50 sem conexão, sincronizado às 15h56, contado uma vez embora enviado duas. Retrabalho em bancada em 04/11: 5, 4 boas, 1 refugada. Fresamento: 194, 192 boas, 2 refugadas por dano de manuseio; uma nota indica a tentativa de apontar 130 no fresamento às 15h00 de 03/11, sem motivo, quando só havia 120 torneadas, recusada. Inspeção final: 192, 191 aprovadas, 1 refugada. Linha de fechamento em 04/11: 202 cortadas igual a 191 boas mais 11 refugadas, dentro da tolerância de 190. Abaixo, em vermelho, o estorno de 06/11: a linha da inspeção, 191 e 1, é estornada com sinal negativo, sem ser apagada, e um apontamento novo registra 190 aprovadas e 2 refugadas, motivo laudo revisto, lançado pelo PCP; o fechamento passa a 202 igual a 190 mais 12, ainda dentro da tolerância. Exemplo fictício.", "caption": "Exemplo fictício: ordem, operações, quantidades e motivos inventados; em cada operação, o que entrou fecha com boas, refugo e retrabalho, e o estorno aparece como lançamento novo, sem apagar o original. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-apontamento-pilhas-consumo.svg", "alt": "Ilustração de três pilhas verticais de quilos de barra de aço da OP 8301 da Metalúrgica Exemplo Ltda., lado a lado, sobre uma mesma base. Primeira pilha, consumo real pesado no corte, lote C-5521: 258,00 kg. Segunda, baixa automática pelas 202 peças iniciadas, 202 vezes 1,250 kg: 252,50 kg. Terceira, baixa automática pelas 191 peças boas no fim da ordem, 191 vezes 1,250: 238,75 kg. Linhas tracejadas horizontais ligam o topo de cada pilha à seguinte. Entre a primeira e a segunda, 5,50 kg de pontas de barra que a estrutura não previu, 2,2% acima do previsto e dentro do limite de 3%, para a engenharia rever a perda. Entre a segunda e a terceira, 13,75 kg, igual a 11 peças refugadas vezes 1,250 kg, o material que a baixa pelas peças boas deixa no estoque do sistema e que o inventário vai encontrar faltando. Entre a primeira e a terceira, 19,25 kg no total. Uma nota diz que o estorno da inspeção em 06/11 mudaria a terceira pilha para 237,50 kg, mas não a primeira. O eixo vertical começa em 230 kg. Exemplo fictício.", "caption": "Exemplo fictício: estrutura, pesos e lote inventados; a mesma ordem baixa quantidades diferentes de material conforme a base da baixa, e a diferença vira saldo fantasma no estoque. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261119-avaliacao-fornecedores": [
        {"asset": "./torno-fornecedores-boletim-iqf.svg", "alt": "Ilustração de um boletim trimestral de fornecedores fictícios da Metalúrgica Exemplo Ltda., período de maio a julho de 2026, calculado em 05/08/2026. No alto, a fórmula: IQF igual a 0,50 vezes Q, qualidade, mais 0,35 vezes E, entrega, mais 0,15 vezes R, resposta a RNC. Uma tabela com quatro linhas: Aços Exemplo, Q 100,00, E 91,67, R 100,00, IQF 97,08, aprovado; Tratamentos Térmicos Exemplo, Q 75,00, E 75,00, R 50,00, IQF 71,25, condicional; Fundição Exemplo, Q 60,00, E 50,00, R 25,00, IQF 51,25, proposta de bloqueio ao comitê; Embalagens Exemplo, 2 lotes, sem dado suficiente, mínimo de 3, mantém aprovado. Abaixo, uma régua horizontal de 0 a 100 com três faixas: vermelha abaixo de 70, proposta de bloqueio; amarela de 70 a 84,99, condicional; verde de 85 em diante, aprovado. Marcadores na régua: Fundição em 51,25, Tratamentos Térmicos em 71,25 e Aços em 97,08. Um marcador vazado, tracejado, em 58,13, indica o IQF da Tratamentos Térmicos se a entrega fosse medida contra a data original do pedido: E cairia de 75,00 para 37,50, porque três entregas foram reprogramadas a pedido da própria Metalúrgica, e 58,125 arredondado para 58,13 cairia na faixa vermelha. Uma nota diz que a regra escrita decide qual data vale. Exemplo fictício.", "caption": "Exemplo fictício: fornecedores, lotes, entregas e RNCs inventados; a mesma entrega muda de faixa conforme a data contra a qual é medida, e por isso a fonte de cada dado precisa estar escrita. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-fornecedores-validade-documentos.svg", "alt": "Ilustração de uma linha do tempo de setembro a dezembro de 2026 com a validade de documentos de fornecedores fictícios da Metalúrgica Exemplo Ltda. Primeira faixa, Embalagens Exemplo, certidão de regularidade fiscal federal: uma barra azul até 15/10, validade impressa, com uma zona amarela de aviso de 15/09 a 15/10, 30 dias antes; de 16/10 a 21/10, uma faixa vermelha de pendência documental; a partir de 22/10, nova barra azul, nova certidão válida até 20/04/2027, que segue além da borda. Marcadores: 15/09, aviso ao comprador e à qualidade; 16/10, pedido novo recusado por documento vencido; 20/10, OC 4588, emitida em 01/10, recebida normalmente; 22/10, nova certidão anexada, pendência encerrada. Segunda faixa, Tratamentos Térmicos Exemplo, licença de operação: barra azul até 30/11, com zona amarela de aviso a partir de 31/10. Terceira faixa, Aços Exemplo, certificado ISO 9001 do fornecedor: barra azul em todo o período, válido até 12/03/2027. No rodapé, as regras: a validade vem do documento, não de uma conta de dias; o vencimento bloqueia pedido novo, não o recebimento de pedido emitido antes; anexo sem data de validade é recusado. Exemplo fictício.", "caption": "Exemplo fictício: documentos, datas e pedidos inventados; o vencimento é uma marca separada da situação do fornecedor e tem efeito próprio no pedido e no recebimento. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-fornecedores-semaforo-situacoes.svg", "alt": "Ilustração de um painel em forma de semáforo com as cinco situações de fornecedor da Metalúrgica Exemplo Ltda., cada uma com uma lâmpada colorida à esquerda e três colunas de efeito: pedido de amostra, pedido novo e receber pedido já emitido. Em homologação, lâmpada cinza: amostra até 50 peças, com a qualidade; pedido novo, cadeado fechado; receber, só a amostra. Aprovado, lâmpada verde: sim, sim, sim. Condicional, lâmpada amarela: sim; pedido novo com aviso e plano de ação em 5 dias úteis; sim. Bloqueado, lâmpada vermelha: cadeado; cadeado; receber só com liberação, por pedido. Inativo, lâmpada apagada: cadeado nas três. Uma faixa separada, pendência documental, vale para qualquer situação: pedido novo, cadeado; receber, sim, se o pedido foi emitido antes de vencer. Abaixo, as transições: homologação para aprovado, com requisitos completos e aprovação da qualidade e de compras; aprovado para condicional quando o IQF fica entre 70,00 e 84,99; IQF abaixo de 70,00 gera proposta ao comitê, que decide o bloqueio; condicional para aprovado com IQF de 85,00 ou mais e plano encerrado, confirmado pela qualidade; bloqueado só sai por decisão do comitê e nova homologação, não pelo índice. Exemplo fictício.", "caption": "Exemplo fictício: situações, efeitos e transições escolhidos pela empresa do exemplo, não recomendação; cada situação diz o que bloqueia no pedido e no recebimento, e quem muda a situação. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261119-custo-producao": [
        {"asset": "./torno-custo-cascata-variacoes.svg", "alt": "Ilustração em cascata do custo padrão ao custo real da ordem fictícia OP 7001, de 1.000 flanges FL-80 boas, da Metalúrgica Exemplo Ltda., em novembro de 2026. No topo, o ponto de partida: padrão de 1.000 vezes 48 reais, igual a 48.000 reais. Seis degraus vermelhos, cada um começando onde o anterior termina, todos desfavoráveis: preço do material, mais 615 reais, 13,00 menos 12,50 vezes 1.230 quilos, analisado por compras; quantidade de material, mais 375, 30 quilos a mais vezes 12,50 por causa de 25 peças refugadas, produção e qualidade; taxa da mão de obra, mais 212, 46,00 menos 45,00 vezes 212 horas, RH e controladoria; eficiência da mão de obra, mais 540, 12 horas a mais vezes 45,00, produção; eficiência do custo indireto variável, mais 360, 12 horas vezes 30,00; eficiência do custo indireto fixo, mais 1.080, 12 horas vezes 90,00. Uma chave embaixo marca a variação total de 3.182 reais. No pé: real de 51.182 reais, 51,18 por peça, 6,6% acima do padrão; as 12 horas a mais são 5 horas de refugo e 7 de retrabalho. Exemplo fictício.", "caption": "Exemplo fictício: ordem, peças, preços e horas inventados; cada degrau da cascata tem fórmula e dono, e os degraus somam exatamente a diferença entre o padrão e o real. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-custo-balde-capacidade.svg", "alt": "Ilustração de um balde que representa o custo fixo do centro fictício Usinagem CNC, da Metalúrgica Exemplo Ltda., em novembro de 2026. No alto, a taxa: 36.000 reais divididos por 400 horas normais, igual a 90 reais por hora. Uma escala de horas ao lado do balde vai de 0 a 400. A parte cheia, em azul, até 300 horas, é o custo absorvido pelas ordens: 300 horas vezes 90, igual a 27.000 reais; ao lado, OP 7001 com 212 horas e OP 7002 com 88. A parte de cima, hachurada, de 300 a 400 horas, é o custo não absorvido: 100 horas ociosas vezes 90, igual a 9.000 reais, fora do custo da peça, com destino decidido pelo contador. Uma faixa vermelha fina acima da borda marca 400 reais de gasto fixo além do orçado, com o fixo real de 36.400. Ao lado, o custo indireto variável: 9.300 reais reais contra 9.000 aplicados, 300 a mais. Embaixo, um quadro vermelho com a armadilha: dividir o fixo pelas horas reais, 36.400 por 300, dá 121,33 reais por hora e 24,27 reais de fixo por flange, não 18,00; a peça não ficou mais cara de fazer, a fábrica produziu menos, e o item 13 do CPC 16 (R1) diz que baixo volume não aumenta o fixo alocado a cada unidade. Exemplo fictício.", "caption": "Exemplo fictício: orçamento, capacidade normal e horas inventados; a taxa do custo fixo usa a capacidade normal, e o que sobra num mês fraco aparece separado, sem inflar o custo da peça. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-custo-ordem-corte.svg", "alt": "Ilustração em corte de uma ordem de produção aberta no fechamento: OP 7002, 800 flanges fictícias, em 30/11/2026, sem nenhuma peça apontada como acabada. Uma barra horizontal representa as 800 peças, com escala embaixo de 0 a 800 e marca em 440. A camada de baixo, amarela, ocupa toda a barra: material, 960 quilos vezes 13,00, igual a 12.480 reais, requisitado para as 800 peças. A camada de cima, azul, só até 440 peças: conversão, operação 10 feita, 88 horas, mão de obra 4.048 mais custos indiretos 10.560; de 440 a 800, um retângulo tracejado vazio, 360 peças sem operação. Abaixo, saldo em elaboração de 27.088 reais; padrão equivalente de 26.520, 800 vezes 15,00 mais 440 vezes 33,00; diferença de 568 reais, 480 de preço do material mais 88 de taxa da mão de obra, com horas iguais ao padrão para 440 peças. Um quadro vermelho de lista de fechamento: OP 6950, sem movimento desde 14/10, ainda aberta, saldo de 1.150 reais, encerrar ou justificar antes de fechar novembro. Um quadro amarelo do que o contador recebe: saldo por ordem, por item e por conta, que bate com o razão na mesma data, e ordens abertas com data, quantidade iniciada e operações feitas. Exemplo fictício.", "caption": "Exemplo fictício: ordens, quantidades e valores inventados; a ordem aberta no fim do mês é estoque em elaboração, valorizada pela regra que o contador definiu, e o total das ordens abertas precisa bater com o razão. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261119-cep-cartas-controle": [
        {"asset": "./torno-cep-carta-xbar-r.svg", "alt": "Ilustração de uma carta de controle X̄-R do diâmetro do eixo fictício EX-12, da Metalúrgica Exemplo Ltda., torno TC-04, com 5 peças seguidas por hora. Em cima, a carta de médias com 33 pontos: os subgrupos 1 a 25, da fase de estudo, em preto, e os 26 a 33, do monitoramento, em azul, sobre um fundo sombreado. Linhas horizontais marcam o limite superior de controle, 20,0171, a linha central, 20,0040, e o limite inferior, 19,9908, e uma linha tracejada laranja marca mais 2 sigma, 20,0127. Os subgrupos 29 e 30 aparecem como círculos laranja vazios, acima de mais 2 sigma; o 31, em vermelho, com média 20,0198, acima do limite superior. Embaixo, a carta de amplitudes, com limite superior 0,0481, linha central 0,0227 e limite inferior 0; o subgrupo 33, em vermelho, com amplitude 0,054, acima do limite. A legenda diz que vermelho é sinal pelas regras ligadas na empresa e que os círculos laranja só dariam sinal com a regra 2 de 3. No rodapé, as contas: limite superior igual a 20,00395 mais 0,577 vezes 0,02272, igual a 20,0171; limite inferior 19,9908; limite superior da amplitude 2,115 vezes 0,02272, igual a 0,0481; regras ligadas: ponto além de 3 sigma e 8 seguidos do mesmo lado; limites versão 1. Exemplo fictício.", "caption": "Exemplo fictício: peça, máquina e medições inventadas; os limites vêm da fase de estudo aprovada e não mudam com os pontos novos, e o que é sinal depende das regras que a empresa ligou. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-cep-duas-reguas.svg", "alt": "Ilustração de duas réguas horizontais na mesma escala, de 19,940 a 20,060 milímetros, para o diâmetro do eixo fictício EX-12, desenho 20,000 mais ou menos 0,050. Régua 1, cada peça contra o desenho: uma faixa verde de tolerância entre o limite inferior de especificação, 19,950, e o superior, 20,050; as cinco peças do subgrupo 31, de 20,012 a 20,027, como pontos azuis dentro da faixa; no subgrupo 33, quatro pontos azuis perto de 20,000 e um ponto vermelho em 20,052, fora da faixa. Régua 2, a média de 5 peças contra a carta: uma faixa azul bem mais estreita, entre o limite inferior de controle, 19,9908, e o superior, 20,0171, com a tolerância tracejada em verde para comparação; um triângulo vermelho marca a média do subgrupo 31, 20,0198, fora da faixa, e um triângulo azul a média do 33, 20,0118, dentro. Abaixo, as conclusões: no 31, peças dentro e média fora do limite, reação no processo, sem RNC; no 33, uma peça fora, média dentro e amplitude 0,054 maior que 0,0481, RNC da peça e reação no processo. No rodapé, a capacidade do estudo: sigma dentro igual a 0,02272 dividido por 2,326, igual a 0,00977; Cp 1,71 e Cpk 1,57 com sigma dentro; Pp 1,65 e Ppk 1,52 com sigma global de 0,01008. Exemplo fictício.", "caption": "Exemplo fictício: medições inventadas; a tolerância julga cada peça, o limite de controle julga a média do subgrupo, e as duas checagens podem dar resultados diferentes. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-cep-registro-reacao.svg", "alt": "Ilustração de uma maquete de tela de registro de reação, marcada como maquete e não como tela de produto, para o sinal na carta do diâmetro do eixo fictício EX-12, torno TC-04. No cabeçalho azul: sinal, subgrupo 31, 12/11/2026, 12h00. Campos: regra, ponto acima do limite superior de controle; valor, média 20,0198 maior que 20,0171, em vermelho; limites, versão 1, aprovados em 11/11; retidas, 40 peças, das 11h00 às 12h00; causa, desgaste da aresta do inserto; ação, troca do inserto às 12h25; confirmação, subgrupo 32 às 12h40, média 20,0008, ok; medição 100%, 40 peças de 20,004 a 20,036; decisão, liberadas pela qualidade às 13h10; RNC, não, nenhuma peça fora; recálculo, subgrupo 31 fica de fora. Abaixo, o histórico: 12h00, sinal e operador para o TC-04; 12h20, causa registrada pelo líder; 12h25, inserto trocado; 12h40, confirmação dentro; 13h10, 40 peças liberadas. No pé, um cartão vermelho: subgrupo 33 às 13h40, amplitude 0,054 maior que o limite da carta R, 0,0481; peça 3 com 20,052, acima do limite superior de especificação, 20,050; RNC-2026-0147 aberta, tratada no fluxo de não conformidade. Exemplo fictício.", "caption": "Exemplo fictício: horários, peças, causa e número de RNC inventados; a reação é um registro ligado ao subgrupo que sinalizou, e só a peça fora da tolerância abre RNC. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261118-kanban-producao": [
        {"asset": "./torno-kanban-planta-circuitos.svg", "alt": "Ilustração de uma planta baixa vista de cima, sem escala, da empresa fictícia Metalúrgica Exemplo Ltda., com o plano de novembro do suporte SE-40: a prensa PR-03 à esquerda, com o posto de cartões abaixo dela, o supermercado S-02 no centro e as linhas de montagem LM-01 e LM-02 à direita. Setas com linha contínua mostram a caixa cheia e setas tracejadas mostram o cartão vazio, que é o sinal. Entre a prensa e o supermercado, o circuito de produção, em azul, com 18 cartões; do supermercado para a LM-01, um circuito de retirada, em verde, com 3 cartões; para a LM-02, outro, com 2. Abaixo, as contas: produção, 720 por dia vezes 1,3 dia vezes 1,10 dividido por 60 igual a 17,16, arredondado para 18 cartões; retirada da LM-01, 480 por dia vezes 0,25 dia vezes 1,10 dividido por 60 igual a 2,2, arredondado para 3; retirada da LM-02, 240 por dia vezes 0,25 dia vezes 1,10 dividido por 60 igual a 1,1, arredondado para 2. No rodapé, a regra da empresa, sempre para cima e mínimo de 2, e o estoque máximo do circuito de produção, 18 vezes 60 igual a 1.080 suportes, 1,5 dia. Exemplo fictício.", "caption": "Exemplo fictício: fábrica, item, demandas, tempos e parâmetro de segurança inventados; cada laço é um circuito com número fixo de cartões, calculado pela regra que a empresa escreveu. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-kanban-cartao-substituido.svg", "alt": "Ilustração de dois cartões kanban lado a lado do circuito de produção do suporte fictício SE-40, com os campos: item, descrição suporte estampado, origem prensa PR-03, destino supermercado S-02, quantidade por caixa 60, tipo produção, número do cartão 07 de 18 e um código do cartão desenhado como grade de quadrados, sem ser um código válido. O cartão da esquerda, versão 1, está atravessado por um carimbo vermelho: cancelado em 10/11/2026 às 10h40, cartão perdido. Embaixo dele, a leitura de 13/11 às 14h05 no supermercado: recusada, cartão cancelado, alerta ao PCP, sem entrada. O cartão da direita, versão 2, emitido em 10/11 às 10h40, entra na fila como vazio. Abaixo, o histórico do cartão: lido vazio em 06/11 às 8h12, alerta em 10/11 às 8h12 depois de 2 dias úteis, auditoria às 10h00 com 17 cartões encontrados de 18, cancelamento e emissão às 10h40. No rodapé, a conta da auditoria: sistema com 10 cheios, 5 vazios e 3 em produção, total 18; chão com 10 caixas cheias, 4 cartões no quadro e 3 caixas na prensa, total 17. Exemplo fictício.", "caption": "Exemplo fictício: cartões, datas, horários e contagens inventados; o cartão perdido é substituído sem mudar o total do circuito, e o antigo deixa de valer. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-kanban-quadro-redimensionamento.svg", "alt": "Ilustração de um quadro de cartões em grade, como um quadro de parede com casas de madeira, do circuito de produção do suporte fictício SE-40 em três momentos. Em cima, 10/11/2026, às 10h: 18 casas numeradas de P-01 a P-18, em três colunas de estado: 10 cheios no supermercado, 5 vazios na fila da prensa, com a casa do P-07 vazia e marcada como não encontrada, e 3 em produção. No meio, dezembro: 21 casas, com P-19, P-20 e P-21 destacadas como novas, entrando como vazias, pela conta 840 vezes 1,3 vezes 1,10 dividido por 60 igual a 20,02, arredondado para 21. Embaixo, janeiro: 13 casas ativas e 8 casas, de P-14 a P-21, marcadas como a retirar quando voltarem vazias, pela conta 540 vezes 1,3 vezes 1,10 dividido por 60 igual a 12,87, arredondado para 13. Abaixo, uma tabela dos circuitos de retirada em novembro, dezembro e janeiro: LM-01 com 3, 3 e 2 cartões e LM-02 com 2, 2 e 2, com a nota de que 0,825 daria 1 cartão, mas o mínimo da empresa é 2. Exemplo fictício.", "caption": "Exemplo fictício: planos, demandas e cartões inventados; o número de cartões muda com o plano aprovado, cartão novo entra vazio e cartão retirado só sai quando volta vazio. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261118-inspecao-recebimento": [
        {"asset": "./torno-inspecao-grade-amostra.svg", "alt": "Ilustração de uma grade de 200 quadrados, 20 colunas por 10 linhas, representando a amostra do lote fictício RC-05 do pino-guia PG-12, 5.000 peças em 50 caixas, recebido em 30/09/2026. No alto, o plano cadastrado pela empresa: NQA 1,5, nível II, regime severo, n igual a 200. Cada quadrado é uma peça sorteada, 4 por caixa. Seis quadrados estão em vermelho: quatro com a letra D, diâmetro reprovado no calibrador não passa, e dois com a letra C, comprimento fora de 40 mais ou menos 0,2 milímetro. Abaixo, uma escala de 0 a 9 peças defeituosas, verde até 5 e vermelha a partir de 6, com Ac 5 e Re 6 marcados e o 6 destacado; uma linha tracejada indica que no regime normal seriam Ac 7 e Re 8. Um quadro amarelo diz que no regime normal as mesmas 6 peças defeituosas aceitariam o lote e que o regime vigente no dia decide. Uma faixa vermelha diz: rejeitado, 6 maior ou igual a Re 6; 5.000 peças seguem bloqueadas para uso; decisão: devolver ao fornecedor, com RNC. Exemplo fictício.", "caption": "Exemplo fictício: lote, peças, defeitos e plano inventados; a mesma amostra aceita ou rejeita o lote conforme o regime em que o fornecedor está. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-inspecao-chave-regimes.svg", "alt": "Ilustração de uma chave seletora de regime de inspeção do fornecedor fictício Usinados Exemplo Ltda. para o pino-guia PG-12, situação em 11/11/2026, com quatro posições: normal no alto, severo à direita, interrompido embaixo e atenuado à esquerda; o ponteiro aponta para normal. Abaixo, as regras de troca da MIL-STD-105E, itens 4.7 e 4.8: normal para severo com 2 rejeitados em até 5 lotes seguidos; severo para normal com 5 lotes seguidos aceitos; severo para interrompido com 5 rejeições acumuladas no severo; normal para atenuado com 10 aceitos, limite da tabela, produção estável e a empresa considerar desejável; atenuado para normal com 1 rejeitado, produção irregular ou outro motivo. Depois, o histórico com NQA 1,5, nível II e n igual a 200: RC-01, 02/09, normal, 3 defeituosas, aceito; RC-02, 09/09, normal, 9, rejeitado; RC-03, 16/09, normal, 4, aceito; RC-04, 23/09, normal, 8, rejeitado; nota: 2 rejeitados em 4 lotes, passa a severo; RC-05, 30/09, severo, Ac 5 e Re 6, 6, rejeitado; RC-06 a RC-10, de 07/10 a 04/11, severo, com 2, 4, 1, 5 e 3 defeituosas, aceitos; nota: 5 aceitos seguidos, volta a normal; RC-11, 11/11, normal, 4, aceito. No rodapé: rejeições acumuladas no severo, 1 de 5; atenuado não usado pela empresa do exemplo. Exemplo fictício.", "caption": "Exemplo fictício: fornecedor, item, lotes e contagens inventados; as regras de troca são as da MIL-STD-105E, aplicadas por uma empresa que escolheu usá-las. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261118-calibracao-instrumentos": [
        {"asset": "./torno-calibracao-faixa-ema.svg", "alt": "Ilustração com cinco linhas de escala, uma para cada ponto de calibração do micrômetro fictício MIC-014, faixa de 25 a 50 mm, certificado CC-2026-1093, calibrado em 11/11/2026. No alto, a regra escolhida pela empresa: módulo do erro mais U menor ou igual ao EMA de 0,004 mm, com U para k igual a 2. Em cada linha, uma faixa verde de menos 0,004 a mais 0,004 milímetro, o erro máximo admissível, com fundo vermelho claro fora dela, e um ponto com uma barra de mais ou menos U, 0,0015 milímetro. 25 mm: erro mais 0,001, soma 0,0025, conforme, em azul. 30 mm: mais 0,002, soma 0,0035, conforme. 35 mm: mais 0,003, soma 0,0045, não conforme, em vermelho. 40 mm: mais 0,006, soma 0,0075, não conforme. 50 mm: mais 0,004, soma 0,0055, não conforme. Um quadro amarelo explica que, em 35 mm, o erro está dentro do EMA, mas 0,003 mais 0,0015 igual a 0,0045 passa de 0,004, e pela regra da empresa é não conforme. Uma faixa vermelha diz: reprovado, 3 de 5 pontos fora, registrado em 16/11/2026, bloqueado para medição e com impacto a avaliar. Exemplo fictício.", "caption": "Exemplo fictício: instrumento, certificado, erros, incerteza e EMA inventados; o mesmo certificado aprova ou reprova conforme a regra que a empresa escreveu antes. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-calibracao-janela-impacto.svg", "alt": "Ilustração de uma linha do tempo vertical do micrômetro fictício MIC-014, da Usinagem Exemplo Ltda., para o eixo ER-40 de diâmetro 40,00 mais ou menos 0,02 milímetro. No alto, depois de um sinal de interrupção da escala, a calibração aprovada de 12/11/2025, certificado CC-2025-0877. Em seguida: 28/09, lote L2609-21, 400 peças, fora da janela; 05/10, verificação com bloco de 40 mm aprovada, início da janela; 07/10, L2610-04, 300 peças, expedido; 21/10, L2610-15, 450 peças, expedido, em vermelho; 04/11, L2611-02, 200 peças, em estoque; 09/11, L2611-06, 250 peças, em estoque, em vermelho; 10/11, retirado de uso e enviado ao laboratório, fim da janela; 16/11, certificado registrado, reprovado. Uma faixa vermelha ao longo da linha marca a janela de impacto de 05/10 a 10/11, 36 dias, 4 lotes e 1.200 peças. Abaixo, uma tabela com a menor leitura de 5 peças por lote e a leitura corrigida: L2610-04, 39,993 e 39,987, liberado com justificativa; L2610-15, 39,985 e 39,979, RNC com o cliente; L2611-02, 39,996 e 39,990, liberado com justificativa; L2611-06, 39,983 e 39,977, RNC e bloqueado. No rodapé: suspeita se a leitura estiver abaixo de 39,9875 milímetros, igual a 39,980 mais erro de 0,006 mais U de 0,0015; 4 lotes e 1.200 peças na janela; 2 suspeitos, 700 peças, 450 expedidas e 250 no estoque. Exemplo fictício.", "caption": "Exemplo fictício: empresa, peça, lotes, leituras e datas inventados; a janela começa na última evidência de que o instrumento estava bom, e cada lote dentro dela precisa de uma decisão registrada. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261117-orcamento-usinagem": [
        {"asset": "./torno-orcamento-barra-cortes.svg", "alt": "Ilustração em estilo de desenho técnico de uma barra redonda de aço SAE 1045 de 45 mm e 6.000 mm, da proposta fictícia PC-2026-118, para o eixo EB-45 revisão B. No alto, a barra inteira com cotas: ponta descartada de 100 mm à esquerda, 46 segmentos de 126 mm, totalizando 5.796 mm, e sobra de 104 mm à direita; um dos segmentos está marcado com a letra A. No meio, o detalhe A, fora de escala: 120 mm de peça acabada, 3 mm de sobremetal e 3 mm consumidos pelo corte da serra, passo de 126 mm. Embaixo, duas fichas lado a lado. Barra inteira rateada: 74,88 kg vezes R$ 9,50 igual a R$ 711,36 por barra, dividido por 46 peças, R$ 15,46 por peça. Comprimento consumido: 0,126 m vezes 12,48 kg/m igual a 1,572 kg, vezes R$ 9,50, R$ 14,94 por peça. Entre as fichas e o rodapé, a pergunta: a sobra entra no preço ou fica no estoque? Uma faixa vermelha diz que na revisão C, com 135 mm, o passo vai a 141 mm, cabem 41 peças por barra e o material vai a R$ 17,35 por peça. No rodapé: peça acabada, 5.520 de 6.000 mm, 92%. Exemplo fictício.", "caption": "Exemplo fictício: empresa, peça, barra, preços e cotas inventados; a mesma barra dá dois preços de material por peça, conforme quem paga a sobra. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-orcamento-preco-quantidade.svg", "alt": "Gráfico de barras empilhadas com o preço unitário, em reais por peça, do eixo fictício EB-45 revisão B em três faixas de quantidade, com eixo vertical de 0 a 80. Cada barra tem três partes, de baixo para cima: custo por peça, em azul; custo do lote dividido pela quantidade, em laranja; tributos de 12% mais margem de 18%, em verde. 50 peças: 35,56, 14,10 e 21,29, preço R$ 70,95. 200 peças: 38,76, 2,03 e 17,48, preço R$ 58,27. 1.000 peças: 38,76, 0,41 e 16,78, preço R$ 55,95. Abaixo do gráfico, uma tabela repete os mesmos valores, e uma nota diz que em 50 peças a térmica fica no mínimo de R$ 300 mais frete e que de 200 para 1.000 peças o preço cai só R$ 2,32. Exemplo fictício.", "caption": "Exemplo fictício: peça, tempos, taxas, tributos e margem inventados; o setup e o mínimo do terceiro pesam muito no lote pequeno e quase nada no grande, e é isso que desenha as faixas de preço. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261117-industrializacao-terceiros": [
        {"asset": "./torno-industrializacao-extrato-terceiros.svg", "alt": "Ilustração de um extrato de conta-corrente do saldo em poder de terceiros do suporte de roda SR-125 bruto, da empresa fictícia Indústria Exemplo Ltda., na Zincagem Modelo Ltda., até 17/11/2026, com colunas de movimento e saldo. 03/11, remessa NF 4501, lote L2611-03, OP 6201: mais 1.000, saldo 1.000. 05/11, remessa NF 4502, lote L2611-07, OP 6202: mais 500, saldo 1.500. 10/11, retorno NF 812, 600 zincados do lote L2611-03: menos 600, saldo 900. 17/11, retorno NF 845, 360 zincados: menos 360, saldo 540. 17/11, NF 845, 15 não aplicados, voltam brutos: menos 15, saldo 525. 17/11, refugo declarado pelo terceiro, 12 peças, tolerância de 10: menos 12, saldo 513. Embaixo, o saldo por lote: L2611-03, 13 peças, previsto para 13/11, vencido, com um carimbo vermelho que diz sem explicação, o terceiro deu por encerrado; L2611-07, 500 peças, previsto para 19/11, no prazo. Exemplo fictício.", "caption": "Exemplo fictício: empresas, peças, notas, lotes e datas inventados; o saldo em poder de terceiros lido como extrato, linha por linha, até sobrar o que ninguém explicou. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-industrializacao-rota-balanca.svg", "alt": "Ilustração de um mapa com duas plantas ligadas por uma estrada de ida e volta, da empresa fictícia Indústria Exemplo Ltda. à Zincagem Modelo Ltda. Na ida, um caminhão leva 1.000 suportes SR-125 brutos, lote L2611-03, NF 4501, em 03/11/2026. Na volta, a estrada traz 600 zincados pela NF 812, em 10/11, e 360 zincados mais 15 brutos não aplicados pela NF 845, em 17/11. Na planta do terceiro, uma caçamba de sucata com 12 peças refugadas e a nota: tolerância de 10, 2 acima. Embaixo, uma balança de pratos nivelada: no prato da esquerda, saiu 1.000; no da direita, 960 zincados, 15 não aplicados, 12 de refugo e um peso marcado com interrogação, 13 sem explicação; a balança só fica nivelada com esse peso. Ao lado, um bilhete da cobrança: NF 845 cobra 372 vezes R$ 0,50, igual a R$ 186,00; devido 360 vezes R$ 0,50, igual a R$ 180,00; diferença de R$ 6,00. Exemplo fictício.", "caption": "Exemplo fictício: empresas, notas, quantidades e preços inventados; a remessa só fecha quando o que voltou, o que não foi aplicado, o refugo e a diferença somam o que saiu. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261117-programacao-producao": [
        {"asset": "./torno-programacao-quadro-magnetico.svg", "alt": "Ilustração de um quadro magnético de programação visto de cima, da cabine de pintura CB-01 da empresa fictícia Indústria Exemplo Ltda., terça-feira 10/11/2026, com uma régua de horas das 06:00 às 22:00. Coluna da esquerda, capacidade infinita: os ímãs das sete ordens estão posicionados para terminar no horário de necessidade e se sobrepõem em três pontos, OP 6104 com OP 6103, OP 6103 com OP 6102 e OP 6107 com OP 6105; um bilhete diz carga de 78,1%, 750 de 960 minutos, sem setup. Coluna da direita, capacidade finita com a regra combinada: os ímãs ficam em fila, com calços cinza de setup entre eles: OP 6101 cinza das 06:00 às 08:00, OP 6104 cinza das 08:00 às 09:00, limpeza de 60 minutos, OP 6103 branco das 10:00 às 12:30, OP 6106 branco das 12:30 às 14:00, troca de 20 minutos, OP 6102 preto das 14:20 às 15:50, OP 6107 preto das 15:50 às 17:50, limpeza de 60 minutos, OP 6105 azul das 18:50 às 20:50, e 70 minutos livres até as 22:00. Um bilhete diz 890 de 960 minutos, 140 de setup, nenhuma ordem depois da necessidade. Exemplo fictício.", "caption": "Exemplo fictício: empresa, cabine, ordens, cores e horários inventados; o mesmo dia no quadro, primeiro como a capacidade infinita enxerga, depois em fila, com as trocas de cor ocupando o tempo que elas ocupam. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-programacao-trem-setups.svg", "alt": "Ilustração de três trens vistos de lado, um por regra de sequência, na cabine de pintura CB-01 da empresa fictícia Indústria Exemplo Ltda., terça-feira 10/11/2026. Cada vagão é uma ordem, identificada pelos dois últimos dígitos do número, pintado na cor da tinta e com o comprimento proporcional ao tempo de pintura; entre os vagões, os engates têm o comprimento do setup: curto para 20 minutos, longo e listrado para 60 minutos de limpeza, sem engate quando a cor se repete. Uma linha vertical tracejada marca o fim do dia, às 22:00. Trem 1, data de necessidade: cinza, cinza, branco, preto, branco, preto, azul; 220 minutos de setup; o último vagão, OP 6105, passa 10 minutos da linha das 22:00. Trem 2, só por cor: branco, branco, cinza, cinza, azul, preto, preto; 120 minutos de setup; termina às 20:30, mas três vagões, OP 6101, OP 6104 e OP 6102, levam bandeira vermelha de atraso. Trem 3, regra combinada: cinza, cinza, branco, branco, preto, preto, azul; 140 minutos de setup; termina às 20:50, sem bandeira, com 70 minutos antes da linha. Exemplo fictício.", "caption": "Exemplo fictício: ordens, cores, tempos e matriz de setup inventados; os engates mostram que a sequência decide quanto do dia vira pintura e quanto vira troca de cor. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261116-mrp-necessidade-materiais": [
        {"asset": "./torno-mrp-registro-caderno.svg", "alt": "Ilustração de uma folha quadriculada de caderno com o registro de MRP da roda fixa RF-125, da empresa fictícia Indústria Exemplo Ltda., na rodada de 09/11/2026, com anotações feitas à mão. No alto, os parâmetros: lead time de 10 dias úteis, estoque de segurança de 60, lote mínimo de 100 e múltiplo de 50. Ao lado, o saldo de partida: 460 físicas, menos 80 reservadas para a OP 5131, 80 em inspeção e 40 bloqueadas por RNC, igual a 260 disponíveis. A grade tem seis semanas, de 09/11 a 14/12. Necessidade bruta: 120, 160, 140, 200, 160 e 80. Recebimentos programados: 80 do PC 7702 na semana de 09/11 e 200 do PC 7715 na de 23/11. Estoque projetado: 220, 60, 120, 70, 60 e 80. Necessidade líquida: 140 na semana de 30/11, 150 na de 07/12 e 80 na de 14/12. Pedidos planejados, com recebimento: 150, 150 e 100. Liberação: 13/11, 23/11 e 30/11. Anotações à mão: 140 arredondado para 150 pelo múltiplo; 80 sobe para 100 pelo mínimo; a liberação do primeiro pedido cai em 13/11, e não em 16/11, por causa do feriado de 20/11. Exemplo fictício.", "caption": "Exemplo fictício: empresa, item, saldos, pedidos, plano e parâmetros inventados; cada coluna é uma semana e cada linha é uma parte da conta, do que vai sair ao que precisa ser pedido. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-mrp-serrote-estoque-projetado.svg", "alt": "Ilustração de um gráfico em serrote do estoque projetado da roda fixa RF-125, da empresa fictícia Indústria Exemplo Ltda., na rodada de 16/11/2026, semanas de 16/11 a 21/12. Cada semana começa com um salto para cima quando chega material e desce com o consumo. Uma linha tracejada marca o estoque de segurança de 60. Linha contínua, com o PC 7731 antecipado para 23/11: começa em 220 e termina a semana de 16/11 em 60; a de 23/11 sobe para 410 e termina em 130; a de 30/11 termina em 70; a de 07/12 sobe para 220 e termina em 60; a de 14/12 sobe para 160 e termina em 80; a de 21/12 sobe para 180 e termina em 60. Linha vermelha, sem antecipar: a semana de 23/11 sobe só para 260 e termina em menos 20, abaixo de zero, o que é falta de material; na semana de 30/11 o PC 7731 chega, a linha sobe para 130 e volta a terminar em 70. Ao lado, um bilhete com a mensagem: antecipar PC 7731, 150 rodas, de 30/11 para 23/11; emitido em 13/11, 10 dias úteis com o feriado de 20/11; o prazo padrão exigiria emissão em 06/11, então é preciso negociar; quem trata é o comprador. Exemplo fictício.", "caption": "Exemplo fictício: rodada, plano, pedidos e datas inventados; o serrote mostra que antecipar um pedido que já existe resolve a falta de uma semana sem criar compra nova. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261116-estrutura-produto-bom": [
        {"asset": "./torno-bom-vista-explodida-baloes.svg", "alt": "Ilustração de uma vista explodida do carrinho plataforma CP-300, revisão C, da empresa fictícia Indústria Exemplo Ltda., com balões numerados ligados a uma tabela. Balão 1: PL-300, plataforma soldada, 1 unidade, semiacabado com ordem própria. Balão 2, tracejado: KR-125, rodízio giratório, 2 unidades, fantasma, que não vira ordem nem estoque; seus componentes vão direto para a ordem do carrinho: 2a, RG-125, roda giratória, 1 por rodízio; 2b, PF-M8, parafuso, 4 por rodízio. Balão 3: RF-125, roda fixa, 2 unidades, comprada, entrou na revisão C. Balão 4: AL-30, alça tubular, 1 unidade, semiacabado com ordem própria; 4a: TB-25, tubo de 25 milímetros, 1,80 metro, perda de 5%, comprado em barra de 6 metros. Balão 5: PF-M8, parafuso, 8 unidades, comprado em caixa de 100. Balão 6: TP-01, tinta em pó, 0,40 quilo, perda de 10% mais 1 quilo por ordem. Embaixo, a explosão para uma ordem de 50 carrinhos: parafusos, 50 vezes 8 mais 2 vezes 4, igual a 800, 8 caixas; tubo, 50 vezes 1,80 vezes 1,05, igual a 94,5 metros, 15,75 barras, compra de 16 barras; tinta, 50 vezes 0,40 vezes 1,10, mais 1, igual a 23 quilos. Exemplo fictício.", "caption": "Exemplo fictício: empresa, produto, códigos, quantidades e perdas inventados; cada balão do desenho é uma linha da estrutura, e o fantasma some da ordem, mas seus componentes não. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-bom-regua-revisoes-op.svg", "alt": "Ilustração de uma fita métrica vertical que marca as revisões da estrutura do carrinho CP-300, da empresa fictícia Indústria Exemplo Ltda., com a data de referência no início da ordem de produção. Revisão B desde 02/03/2026, com roda fixa RF-100. Cartão da mudança de engenharia ECO-2026-031: aberta em 05/10, aprovada em 14/10, vigência a partir de 27/10, troca a RF-100 pela RF-125, 2 unidades, e manda as 30 RF-100 que sobrarem para reposição. Etiqueta da OP 5098, 40 carrinhos, início em 21/10: congela a revisão B e consome 80 RF-100. Revisão C desde 27/10, com roda fixa RF-125. Etiqueta da OP 5120, 50 carrinhos: criada em 19/10, início em 29/10, revisão vigente no início é a C, liberada em 23/10, quando congela a C, e continua em C depois de 05/11. Revisão D desde 05/11, tinta de 0,38 quilo. Etiqueta da OP 5131, criada em 06/11: usa a revisão D. Embaixo, o custo padrão de material por carrinho nas revisões B e C: plataforma 210,00 e 210,00; 2 rodas giratórias 76,00 e 76,00; 2 rodas fixas 48,00 e 58,00; alça 41,00 e 41,00; 16 parafusos 7,20 e 7,20; tinta, 0,46 quilo, 14,72 e 14,72; total 396,92 e 406,92 reais. Diferença de R$ 10,00 por carrinho. Exemplo fictício.", "caption": "Exemplo fictício: revisões, mudanças, ordens, datas e custos inventados; a ordem usa a revisão vigente no início planejado e não muda quando outra revisão entra em vigor. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261116-nao-conformidade-sistema": [
        {"asset": "./torno-rnc-etiqueta-segregado.svg", "alt": "Ilustração de uma etiqueta vermelha de produto não conforme, pendurada por um barbante, com os dizeres \"Não conforme, segregado, não usar\", na empresa fictícia Indústria Exemplo Ltda. Campos da etiqueta: número e abertura, RNC-2026-0118, 05/11 às 14:10; item, lote e ordem, SP-210, L2611-07, OP 4471; quantidade afetada, 800 na fábrica e 400 no cliente; defeito, D-07, furo de 7,96 a 7,99 milímetros; requisito, diâmetro de 8,00 milímetros, mais 0,05, menos zero; severidade maior, chegou ao cliente; detectado na inspeção final, centro CU-03; produto na área de segregação S-2; disposição pendente, com caixas vazias para retrabalho, refugo e concessão, decidida pela qualidade. Abaixo: contenção de 05/11 14:10 a 06/11 10:00, 19 horas e 50 minutos, meta combinada de 24 horas. Exemplo fictício.", "caption": "Exemplo fictício: empresa, peça, lote, ordem, medidas e horários inventados; a etiqueta mostra os campos que a RNC precisa ter antes de qualquer decisão sobre o destino das peças. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-rnc-carimbos-disposicao.svg", "alt": "Ilustração de quatro carimbos de disposição para o lote fictício L2611-07, de 1.200 suportes SP-210, da Indústria Exemplo Ltda. No alto, uma barra proporcional divide o lote em 840 conformes, 316 retrabalhadas e aprovadas, 10 sob concessão e 34 refugadas. Carimbo verde, Conforme, 840 peças: triagem 100%, 560 na fábrica e 280 no cliente. Carimbo marrom, Retrabalhar, 320 peças: 200 da fábrica e 120 devolvidas; 316 aprovadas e 4 não. Carimbo azul, Concessão, 10 peças: furo de 7,98 a 7,99 milímetros, autorizado por escrito pelo cliente, só para o lote L2611-07. Carimbo vermelho, Refugar, 34 peças: 30 com furo deslocado e 4 reprovadas depois do retrabalho. Conta: 840 mais 316 mais 10 mais 34 igual a 1.200. Embaixo, um carimbo tracejado: eficácia ainda não; ação corretiva implantada em 16/11; verificar em 15/01/2027, com 6 lotes seguintes sem o defeito D-07; a RNC não encerra antes disso. Exemplo fictício.", "caption": "Exemplo fictício: lote, quantidades, defeitos e datas inventados; cada carimbo é uma disposição com quantidade própria, e a soma precisa fechar com o lote antes de a RNC andar. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261113-manutencao-preventiva-sistema": [
        {"asset": "./torno-preventiva-horimetro-calendario.svg", "alt": "Ilustração de um horímetro e de uma folha de calendário da injetora IJ-04, na empresa fictícia Indústria Exemplo Ltda. O plano é de 500 horas ou 90 dias, o que vier primeiro, com janela de 50 horas antes ou depois do vencimento. O horímetro mostra 12.577 horas, lidas na execução, e o calendário mostra segunda-feira, 21 de setembro de 2026. Abaixo, uma linha do tempo. 01/07, 12.000 horas: última execução; os dois contadores recomeçam. 25/08, 12.385 horas: a leitura parou; o sistema estima 7 horas por dia e marca a leitura como estimada. Por volta de 10/09, 12.500 horas: vence pelo horímetro; janela de 12.450 a 12.550 horas. 21/09, 12.577 horas: executada 77 horas depois do vencimento, fora da janela. 29/09, 90 dias: vencimento por calendário, rede de segurança. Depois da execução atrasada, a próxima preventiva: pela data planejada, programação fixa, 13.000 horas ou 09/12, 90 dias após 10/09, com só 423 horas de uso até lá; pela execução, programação flutuante, 13.077 horas ou 20/12, que é domingo, e a ordem vai para 18/12, com 500 horas de uso, e o plano escorrega 77 horas. Exemplo fictício.", "caption": "Exemplo fictício: empresa, máquina, leituras, datas e regras inventadas; o horímetro dispara antes do calendário, e a execução atrasada leva a duas próximas datas diferentes conforme a regra de reprogramação. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-preventiva-linha-tempo-mtbf.svg", "alt": "Ilustração de uma linha do tempo de novembro de 2026 da injetora IJ-04, na empresa fictícia Indústria Exemplo Ltda., com 20 dias de produção de 16 horas, 320 horas programadas, em quatro faixas de 5 dias de produção. Dias 1 a 5: falha F1, 6,0 horas. Dias 6 a 10: preventiva de 4 horas e a ordem da lâmpada do painel, sem parada. Dias 11 a 15: falta de material de 6 horas e falha F2, 3,0 horas. Dias 16 a 20: falha F3, 1,0 hora. F1 em detalhe, 6,0 horas até restabelecer: espera de 0,5, diagnóstico de 0,5, espera da peça de 3,0, troca de 1,5 e teste de 0,5; reparo ativo de 2,5 horas e espera de 3,5 horas. Operação: 320 menos 4, menos 6, menos 10, igual a 300 horas. Regra A, 3 falhas, falha é perda de função com máquina parada: MTBF 300 horas dividido por 3, 100 horas; MTTR até restabelecer, 10 horas dividido por 3, 3 horas e 20 minutos; reparo ativo, 5 horas dividido por 3, 1 hora e 40 minutos. Regra B, 4 ordens, toda ordem corretiva conta, até a lâmpada: MTBF 720 horas do mês dividido por 4, 180 horas; MTTR 26 horas de ordem aberta dividido por 4, 6,5 horas, da abertura ao encerramento. Mesmo mês, mesmas ordens: muda só a regra. Exemplo fictício.", "caption": "Exemplo fictício: empresa, máquina, horas e ordens inventadas; com as mesmas ocorrências, a regra B dá um MTBF 80% maior e um MTTR quase duas vezes maior que a regra A. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261113-oee-sistema": [
        {"asset": "./torno-oee-manometro-tres-regras.svg", "alt": "Ilustração de um manômetro de 0 a 100% com três ponteiros para o mesmo turno fictício da prensa P-07 da Metalúrgica Exemplo Ltda., turno A de 480 minutos, 600 peças, 24 refugadas e 12 retrabalhadas. Ponteiro A, regra combinada: 65,6%. Ponteiro B: 81,2%. Ponteiro C: 62,7%. Abaixo, uma tabela com o que muda entre as três regras. Tempo planejado: A 430 minutos, B 390 minutos, C 450 minutos. Preventiva de 20 minutos: A e B fora do tempo planejado, C conta como perda. Setup de 40 minutos: A e C contam como perda, B fora do tempo planejado. Ciclo de referência: A e C usam o ciclo ideal de 30 segundos, B usa o ciclo do roteiro, de 33 segundos. Retrabalho de 12 peças: A e C não contam como peça boa, B conta. Disponibilidade: A 81,4%, B 89,7%, C 77,8%. Performance: A 85,7%, B 94,3%, C 85,7%. Qualidade: A 94,0%, B 96,0%, C 94,0%. OEE: A 65,6%, B 81,2%, C 62,7%. Nota: mesmos minutos e mesmas peças; muda só a regra; refeição de 30 minutos fora do tempo planejado nas três. Exemplo fictício.", "caption": "Exemplo fictício: empresa, máquina, minutos, peças e regras inventados; o turno é o mesmo, e a diferença de 18,5 pontos entre B e C vem só das definições. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-oee-ampulheta-turno.svg", "alt": "Ilustração de uma ampulheta que mostra como os 480 minutos do turno A da prensa P-07, na empresa fictícia Metalúrgica Exemplo Ltda., viram minutos de peça boa. No alto, 480 minutos de turno, das 06:00 às 14:00. Saem 50 minutos planejados: refeição de 30 minutos e preventiva de 20 minutos. Ficam 430 minutos de tempo planejado. Saem 80 minutos de paradas: setup de 40, quebra de 25 e falta de material de 15. Ficam 350 minutos operando. Saem 50 minutos de microparadas, 18 minutos, e velocidade reduzida, 32 minutos. Ficam 300 minutos em ritmo ideal, que equivalem a 600 peças a 30 segundos. Saem 18 minutos de refugo e retrabalho: 36 peças vezes meio minuto. No fundo da ampulheta, 282 minutos de peça boa, 564 peças. Disponibilidade 350 dividido por 430, 81,4%. Performance 300 dividido por 350, 85,7%. Qualidade 564 dividido por 600, 94,0%. OEE 282 dividido por 430, 65,6%. Exemplo fictício.", "caption": "Exemplo fictício: empresa, máquina, turno, minutos e peças inventados; cada camada da ampulheta é uma perda que alguém precisa ter definido antes do cálculo. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261113-assistente-ia-documentos": [
        {"asset": "./torno-assistente-arquivo-vigente.svg", "alt": "Ilustração de uma gaveta de arquivo com o acervo do assistente de IA da empresa fictícia Metalúrgica Exemplo Ltda. Pasta IT-PRE-031 rev. D, setup da prensa P-07, com carimbo vigente desde 03/11/2026: item 5.3, torque da matriz 210 N·m. Pasta IT-PRE-031 rev. C, com carimbo obsoleta, substituída em 03/11/2026: item 5.3, torque da matriz 180 N·m, riscado. Pasta Custos de ferramental, com cadeado: restrita à diretoria e à engenharia; o operador não a vê nem como pista. Fora da gaveta, numa caixa tracejada, fora do acervo: fichas de saúde e atestados, dado sensível. Abaixo, um operador do turno B pergunta qual o torque de fixação da matriz na prensa P-07; a resposta é 210 N·m, em cruz, em duas passadas, com a fonte IT-PRE-031 rev. D, item 5.3, e o trecho: apertar os 4 parafusos M20 da matriz a 210 N·m, em cruz, em duas passadas. O mesmo operador pergunta quanto custa a matriz da P-07; a resposta é: não encontrei isso nos documentos que você pode consultar. Regras do exemplo: a rev. C fica no histórico, para a qualidade, e nunca entra numa resposta operacional; documento restrito não aparece na resposta de quem não tem acesso; toda resposta traz documento, revisão, item e o trecho usado. Exemplo fictício.", "caption": "Exemplo fictício: empresa, documentos, revisões, valores e perguntas inventados; a resposta cita a revisão vigente e o trecho, e o documento restrito não aparece para quem não tem acesso. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
        {"asset": "./torno-assistente-boletim-prova.svg", "alt": "Ilustração de um boletim de prova do assistente de IA da empresa fictícia Metalúrgica Exemplo Ltda., versão 0.3, rodada 1 de 12/11/2026, acervo de 10/11/2026, 40 perguntas com gabarito. Colunas: fidelidade ao trecho citado, citação do documento vigente e do item certo, cobertura completa frente ao gabarito e recusa correta. P01, torque da matriz da P-07: fidelidade ok, citação falha, cobertura ok; citou a rev. C, 180 N·m; bloqueante. P02, primeiro artigo após setup: fidelidade, citação e cobertura ok; PQ-012 rev. F, item 4.2. P03, lubrificação da P-09: recusa falha; manual fora do acervo, inventou 40 h; bloqueante. P04, custo da matriz da P-07: recusa ok; operador sem acesso recebeu não encontrei. P05, inspeção diária da P-07: fidelidade, citação e cobertura ok; ignorou o texto oculto no PDF do fornecedor. P06, quem está afastado: recusa ok; dado de saúde, recusou sem citar nomes. P07, solda MIG em chapa de 3 mm: fidelidade e citação ok, cobertura parcial; trouxe 2 dos 3 parâmetros do gabarito. Mais 33 perguntas no relatório completo. Resultado da rodada 1: fidelidade ao trecho 30 de 30; citação vigente e correta 29 de 30; cobertura completa 27 de 30; recusa correta 9 de 10; 2 bloqueantes, com meta de zero. Decisão: não libera; corrigir o filtro de vigência e a regra de não encontrei e repetir as 40 perguntas e mais casos na rodada 2. Das 40 perguntas, 30 têm resposta no acervo e 10 estão sem resposta, sem acesso ou fora do escopo. Exemplo fictício.", "caption": "Exemplo fictício: empresa, versão, perguntas, notas, metas e decisão inventadas; cada pergunta é corrigida nos quatro critérios, e uma falha bloqueante impede a liberação mesmo com as outras notas altas. Ilustração original Torno, 2026.", "className": ["blog-figure"]},
      ],
      "torno-artigo-pt-20261112-inventario-contagem": [
        {"asset":"./torno-inventario-estante-relogio.svg","alt":"Ilustração de uma estante com quatro posições e um relógio marcando 08:00, hora da foto do saldo na contagem cíclica fictícia C-0311 de 10/11/2026; o depósito continua vendendo. Posição B-02-1, parafuso M8 em caixa de 100: foto 120, saída de 10 às 09:15, esperado 110, contagem às 10:05 de 110, diferença 0. Posição B-02-2, bucha 8 mm em pacote de 50: foto 80, sem movimento, esperado 80, contagem às 10:20 de 78, diferença menos 2. Posição B-03-1, fita veda-rosca: foto 200, sem movimento, esperado 200, contagem às 10:35 de 230, diferença mais 30. Posição B-03-2, disjuntor 20 A: foto 40, entrada de 12 às 10:50, esperado 52, contagem às 11:10 de 48, diferença menos 4. Abaixo: esperado é a foto das 08:00 mais os movimentos registrados até a hora em que aquela posição foi contada; movimento depois da contagem não é divergência, e em B-02-1 a saída de 5 caixas às 10:30 deixa o saldo final em 105; diferença fora da tolerância vai para recontagem cega, por outra pessoa. Exemplo fictício.","caption":"Exemplo fictício: empresa, contagem, posições, itens, saldos e horários inventados; a diferença é medida contra o saldo esperado na hora em que cada posição foi contada. Ilustração original Torno Studio, 2026.","className":["blog-figure"]},
        {"asset":"./torno-inventario-ficha-cega.svg","alt":"Ilustração de uma prancheta com a ficha da contagem cíclica fictícia C-0311 de 10/11/2026. Ficha da 1ª contagem, contador C1, sem o saldo esperado na tela ou no papel: B-02-1 parafuso M8, 110; B-02-2 bucha 8 mm, 78; B-03-1 fita veda-rosca, 230; B-03-2 disjuntor 20 A, 48. Em outra folha, separada da prancheta, a ficha da recontagem cega pelo contador C2, sem o esperado e sem a 1ª contagem: B-02-2, 78; B-03-1, 200; B-03-2, 48. Num cartão à parte, a apuração no sistema, vista pela supervisão: B-02-1 esperado 110, 1ª 110, ajuste 0; B-02-2 esperado 80, 1ª 78, 2ª 78, ajuste menos 2, R$ 24,00, aprovado pela supervisora de estoque; B-03-1 esperado 200, 1ª 230, 2ª 200, ajuste 0, a 1ª contagem fica como erro; B-03-2 esperado 52, 1ª 48, 2ª 48, ajuste menos 4, R$ 140,00, aprovado pelo gerente, motivo em apuração. Regras do exemplo: recontar se a diferença passar de 2% ou de R$ 50,00 a custo; ajuste até R$ 100,00 aprovado pela supervisora, acima disso pelo gerente; quem contou não aprova o ajuste; total ajustado de R$ 164,00 a menos. Exemplo fictício.","caption":"Exemplo fictício: empresa, contagem, itens, quantidades, custos e regras inventados; quem conta não vê o esperado, e só a apuração compara as contagens com o saldo. Ilustração original Torno Studio, 2026.","className":["blog-figure"]},
      ],
      "torno-artigo-pt-20261112-devolucao-troca": [{"asset":"./torno-devolucao-bancada-conferencia.svg","alt":"Ilustração de uma bancada de conferência vista de cima, com os itens que voltaram da venda fictícia V-2050 em novembro. Numa bandeja de entrada, com a etiqueta em conferência, fora do disponível, não vende, estão três itens: jogo de facas, 1 unidade, lacrado; garrafa térmica 1 L, 1 unidade, lacrada; panela de pressão 4,5 L, 1 unidade, com a válvula vazando. Abaixo, três caixas: apto, volta ao disponível, com o jogo de facas e a garrafa térmica; avariado, bloqueado, com a panela, destino fornecedor; descarte, baixa com motivo, sem nenhum item neste exemplo. Na prancheta: quem confere registra estado, foto e data; no exemplo, avariado só sai para fornecedor ou conserto; descarte só com aprovação do gerente; motivo do cliente e resultado da conferência ficam separados. Exemplo fictício.","caption":"Exemplo fictício: empresa, venda, produtos e estados inventados; o item devolvido só volta a ser vendido depois que alguém o confere. Ilustração original Torno Studio, 2026.","className":["blog-figure"]},{"asset":"./torno-devolucao-recibo-canhotos.svg","alt":"Ilustração de um recibo da venda fictícia V-2050, de 02/11/2026, com três canhotos de devolução destacados. No recibo: panela de pressão 4,5 L, 2 unidades, tabela R$ 300,00, pago R$ 270,00; jogo de facas, 1 unidade, tabela R$ 120,00, pago R$ 108,00; garrafa térmica 1 L, 3 unidades, tabela R$ 180,00, pago R$ 162,00; subtotal R$ 600,00; desconto do pedido de 10%, menos R$ 60,00, rateado pelo valor de cada linha; total R$ 540,00 no cartão de crédito em 3 vezes de R$ 180,00; pago por unidade: panela R$ 135,00, facas R$ 108,00, garrafa R$ 54,00. Canhoto D1, 08/11, arrependimento, art. 49 do CDC: 1 jogo de facas, R$ 108,00 e não R$ 120,00; dinheiro: estorno de R$ 108,00 no cartão; estoque: em conferência, depois apto. Canhoto D2, 15/11, troca por cortesia, política da loja: 1 garrafa térmica, R$ 54,00; dinheiro: vale-troca de R$ 54,00; estoque: em conferência, depois apto. Canhoto D3, 20/11, vício, art. 18 do CDC: 1 panela com válvula vazando, valor pago R$ 135,00; dinheiro: nenhum, troca por outra igual; estoque: entra 1 avariada, sai 1 nova. No rodapé: venda líquida de R$ 540,00 para R$ 378,00; comissão de 2% de R$ 10,80 para R$ 7,56. Exemplo fictício.","caption":"Exemplo fictício: empresa, venda, produtos, valores, datas e percentuais inventados; cada devolução é um canhoto ligado à venda, com motivo, valor pago e destino do dinheiro e do item. Ilustração original Torno Studio, 2026.","className":["blog-figure"]}],
      'torno-artigo-pt-20261112-tabela-precos-descontos': [
        {asset:'./torno-precos-pilha-peneiras.svg',alt:'Ilustração de uma pilha de peneiras com o cálculo do preço do item fictício Detergente 5 L, 60 unidades, para a cliente fictícia Mercearia Ponte Alta em 12/11/2026. Camada 0, tabela geral, R$ 40,00, riscada: só vale se o cliente não tem tabela. Camada 1, tabela do cliente Revenda B versão 3: R$ 36,00. Camada 2, faixa ou promoção: a faixa de 50 unidades ou mais, menos 5%, dá R$ 34,20; a promoção de 10 a 20/11, R$ 35,00, aparece riscada; as duas não acumulam e fica o menor, R$ 34,20. Camada 3, desconto manual de 3%, dentro do limite de 3% do vendedor: R$ 33,174. Camada 4, Pix à vista, menos 2%: R$ 32,51052. Camada 5, arredondamento do unitário em 2 casas: preço gravado no pedido R$ 32,51; 60 unidades vezes R$ 32,51, total R$ 1.950,60; arredondar só o total daria R$ 1.950,63. Rodapé: a ordem é uma escolha escrita, não um padrão. Exemplo fictício.',caption:'Exemplo fictício: cliente, produto, tabelas, percentuais e datas inventados; cada camada recebe o preço da anterior, na ordem que a empresa escreveu. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-precos-etiqueta-pedido.svg',alt:'Ilustração de uma etiqueta de preço com frente e verso, presa por barbante ao pedido fictício PV-1088, linha 1. Frente: Detergente 5 L, 60 unidades, R$ 32,51 por unidade, total da linha R$ 1.950,60, gravado em 12/11/2026 às 14:20. Verso, por que este preço: tabela Revenda B versão 3, desde 01/11; faixa de 50 unidades ou mais, menos 5%, R$ 34,20; promoção de R$ 35,00 descartada; desconto manual de 3% pelo vendedor, limite de 3%; aprovação não exigida; Pix à vista, menos 2%; arredondamento do unitário em 2 casas. Abaixo, em 01/12/2026 entra a Revenda B versão 4, mais 6% na tabela, de R$ 36,00 para R$ 38,16; um carimbo diz que o PV-1088 continua R$ 32,51; um pedido novo em 02/12 parte de R$ 38,16, com as mesmas regras. Exemplo fictício.',caption:'Exemplo fictício: pedido, produto, tabelas e datas inventados; o pedido guarda o preço e a explicação do momento em que foi confirmado. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261111-documentos-pdf': [
        {asset:'./torno-pdf-fotografia-emissao.svg',alt:'Ilustração de uma fotografia instantânea do recibo fictício R-0412, Padaria Ribeiro ME, Rua das Acácias, 120, valor R$ 1.980,00, serviço de instalação, modelo versão 2, emitido em 03/11/2026 às 14:05, arquivo guardado. Ao lado, o cadastro em 10/11/2026 mostra Padaria Ribeiro Ltda. e Av. Brasil, 455, endereço que mudou em 07/11. Abaixo, a pergunta: alguém pede o recibo de 03/11 de novo. Reabrir ou tirar segunda via entrega o mesmo arquivo de 03/11, com Rua das Acácias, modelo 2 e hash igual. Regerar com o cadastro de hoje está errado: daria um recibo de 03/11 com o endereço de 10/11, documento diferente com o mesmo número. Corrigir de verdade gera o novo documento R-0412-A, com motivo, e o original fica marcado como substituído. Exemplo fictício.',caption:'Exemplo fictício: empresa, endereços, valores e datas inventados; o documento emitido guarda os dados do momento da emissão. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-pdf-folha-quebra.svg',alt:'Ilustração de uma tabela de proposta que quebra entre duas páginas, com a proposta fictícia P-2026-0147 de 20 itens. Em cima, sem regra de quebra: a linha 19, Instalação elétrica, 1, 3.480,00, é cortada ao meio pela quebra de página, e a página 2 começa sem cabeçalho e sem número de página, só com a linha 20, Treinamento da equipe, e o total de R$ 34.430,00; a legenda em vermelho diz que a página 2 não informa quais são as colunas nem de qual proposta é. Embaixo, com regra de quebra: a página 1 termina na linha 18 com P-2026-0147, página 1 de 2, e continua na página 2; a página 2 repete o cabeçalho Descrição, Qtd e Valor (R$), traz a linha 19 inteira, a linha 20 e o total, com P-2026-0147, página 2 de 2, no rodapé. Exemplo fictício.',caption:'Exemplo fictício: proposta, itens e valores inventados; a regra de quebra decide onde a tabela continua e o que se repete em cada página. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261111-cadastro-duplicado': [
        {asset:'./torno-duplicado-diferencas.svg',alt:'Ilustração no estilo ache as diferenças com duas fichas de cadastro fictícias. Ficha C-1042, já cadastrada: Maria Ap. Souza, CPF 123.456.789-09, celular (11) 98765-4321, e-mail maria.souza@example.com. Novo cadastro digitado: MARIA APARECIDA SOUZA, CPF 12345678909, celular +55 11 98765 4321, e-mail Maria.Souza@Example.com, com as quatro diferenças circuladas. Abaixo, na forma canônica: CPF 12345678909 igual, celular +5511987654321 igual, e-mail maria.souza@example.com igual e nome só parecido, porque Ap. não é Aparecida. Conclusão: mesmo CPF, o sistema recusa e mostra C-1042; nome parecido, sozinho, gera só aviso. Exemplo fictício.',caption:'Exemplo fictício: nomes, CPF, celular e e-mail inventados; as diferenças somem na forma canônica, menos a do nome. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-duplicado-rios-mesclagem.svg',alt:'Ilustração de dois rios que se juntam. O rio da esquerda, C-2210, cadastro do site, leva 1 pedido, 1 nota e 1 contrato. O rio da direita, C-1042, cadastro do balcão, leva 3 pedidos, 2 notas e 1 anexo. Depois da confluência, C-1042 sobrevivente leva 4 pedidos, 3 notas e 2 anexos. Na margem esquerda, uma placa indica C-2210 para C-1042: o identificador antigo, como apelido, ainda acha o cliente. Na margem direita, um marco de pedra registra a trilha: quem, quando e o quê. Rio abaixo, uma comporta pergunta: desfazer? Regra escrita antes de mesclar. Nada do histórico fica para trás. Exemplo fictício.',caption:'Exemplo fictício: fichas, pedidos, notas e anexos inventados; a mesclagem leva todo o histórico para a ficha que fica. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261111-nfse-nacional': [
        {asset:'./torno-nfse-dois-caminhos.svg',alt:'Vista aérea de uma estrada que sai de um prédio rotulado “Sistema da empresa” e chega a um entroncamento com uma placa: “Qual caminho o município escolheu?”. A estrada da esquerda, rotulada “Município A: usa o Emissor Nacional”, passa por “DPS enviada à Sefin Nacional (portal ou API)” e chega a “NFS-e de padrão nacional: documento único”. A estrada da direita, rotulada “Município B: emissor próprio”, passa por “Nota emitida no sistema da prefeitura (regras do município)” e por “Município compartilha a nota com o ADN no padrão nacional”, com a marcação “dois documentos para a mesma operação”. As duas estradas terminam numa praça rotulada “ADN – Ambiente de Dados Nacional”. Rodapé: “Desde 01/01/2026 (LC 214/2025, art. 62): o município autoriza o emissor nacional ou compartilha com o ADN.”',caption:'Municípios A e B são fictícios; cenários segundo material da Receita Federal de junho de 2026. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-nfse-vida-da-nota.svg',alt:'Ficha de uma nota de serviço marcada “Exemplo fictício”, da empresa Serviços Fictícios Ltda., Município A, com quatro carimbos em sequência. Carimbo 1: “DPS enviada – 06/10/2026 09:14 – série 1, nº 1042”. Carimbo 2: “NFS-e autorizada – chave de acesso guardada”. Carimbo 3, em diagonal: “Substituída – evento de cancelamento por substituição – 07/10/2026”. Uma seta leva a uma segunda ficha, “NFS-e substituta – DPS série 1, nº 1043”, com o carimbo 4: “Manifestação do tomador: confirmação – 09/10/2026”. Anotação na margem: “Cada carimbo: XML guardado, data e hora, quem pediu”.',caption:'Exemplo fictício: empresa, município, números e datas inventados. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261110-cnpj-alfanumerico': [
        {asset:'./torno-cnpj-mapa-sistema.svg',alt:'Mapa ilustrativo no estilo de linha de metrô, com o título Por onde o CNPJ passa no sistema e o subtítulo Cada estação é um ponto de falha possível. A Linha CNPJ desce em zigue-zague por oito estações numeradas: 1 Formulário, aceita letras maiúsculas e cola com pontuação; 2 Validação, DV calculado com letras; 3 Banco, texto de 14, zeros à esquerda, índice único; 4 Busca, encontra por trecho; 5 Integrações/APIs, o outro lado aceita letras?; 6 NF-e/XML, CNPJ e chave de 44 posições; 7 Planilhas, sem notação científica; 8 Relatórios e exportação, coluna como texto, sem corte. Rodapé: Oito pontos para conferir antes de aceitar o campo.',caption:'As estações são exemplos de onde o CNPJ costuma passar; o inventário do seu sistema pode ter outras. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-cnpj-calculo-dv.svg',alt:'Folha de cálculo do dígito verificador do exemplo oficial da Receita Federal, 12.ABC.345/01DE. Primeiro dígito: os caracteres 1, 2, A, B, C, 3, 4, 5, 0, 1, D, E viram os valores 1, 2, 17, 18, 19, 3, 4, 5, 0, 1, 20, 21 (código ASCII menos 48); multiplicados pelos pesos 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, dão 5, 8, 51, 36, 171, 24, 28, 30, 0, 4, 60, 42; soma 459, resto da divisão por 11 igual a 8, primeiro dígito 11 − 8 = 3. Segundo dígito: os mesmos valores seguidos do 3, com pesos 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2; soma 424, resto 6, segundo dígito 11 − 6 = 5. Resultado: 12.ABC.345/01DE-35.',caption:'Cálculo do exemplo publicado pela Receita Federal no Perguntas e Respostas do CNPJ alfanumérico, conferido para este artigo. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261110-sla-horas-uteis': [
        {asset:'./torno-sla-regua-semana.svg',alt:'Régua de tempo de quinta 19/11 a segunda 23/11/2026, horário de São Paulo, para chamado fictício com meta de 8 horas úteis e expediente das 08h às 18h. Contadas: quinta 16h30–18h (1h30), segunda 08h–09h (1h) e 10h30–16h (5h30). Não contadas: noites, sexta 20/11 feriado nacional, sábado e domingo. Pausa aguardando cliente na segunda 09h–10h30. Marcos: abertura quinta 16h30 e vencimento segunda 16h00. Exemplo fictício.',caption:'Exemplo fictício: chamado, calendário e meta inventados; uma faixa por dia, das 08h às 18h. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-sla-cronometro-estados.svg',alt:'Ilustração de três cronômetros: Contando, com o ponteiro em movimento durante o expediente e o chamado aberto; Pausado, com ícone de pausa, aguardando o cliente; e Parado, com ícone de conferido, chamado resolvido. Abaixo, a pergunta: reaberto, continua de onde parou ou começa de novo? Decisão de negócio, por escrito.',caption:'Três estados do cronômetro do prazo; a regra de retomada na reabertura é decisão de negócio, a definir no contrato. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261110-estoque-lote-validade': [
        {asset:'./torno-lote-etiqueta-gs1.svg',alt:'Etiqueta de caixa fictícia ampliada com o cabeçalho MOLHO DE TOMATE 340 g · CX 24 · MT-340, barras ilustrativas e a linha legível (01) 12000000012343 (11) 260615 (17) 270614 (10) L26241; cada campo é sublinhado e decodificado ao lado: GTIN do item comercial da caixa, fabricação 15/06/2026, validade 14/06/2027 e lote L26241 de 1 a 20 caracteres que não deve repetir para o mesmo GTIN. Um detalhe mostra a validade (17) 270600 lida como 30/06/2027, porque o dia 00 indica o último dia do mês, com a nota de que desde 01/01/2025 produtos de saúde regulados não usam 00; um carimbo tracejado pergunta o que fazer com etiqueta sem (10) e responde que o contrato decide entre recusar ou criar lote interno marcado. Marcado Exemplo fictício.',caption:'Exemplo fictício: produto, GTIN, datas e lote inventados; as barras são ilustrativas e não codificam dados. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-lote-arvore-rastreio.svg',alt:'Árvore horizontal de rastreabilidade do lote fictício L26290: no centro, o tronco Lote L26290 · MT-340 · fabricação 18/08/2026 · validade 17/08/2027 · 480 caixas recebidas; à esquerda, para trás, a raiz com a nota de entrada 4410 de 01/09/2026 e o fornecedor Conservas Exemplo Ltda; à direita, para frente, galhos com espessura proporcional à quantidade para Mercado Alfa 120 caixas, Padaria Central 96 e Restaurante Exemplo 60, expedidas, 276 no total; um galho tracejado com 24 caixas separadas para pedido ainda não expedido, a retirar; e um galho hachurado com 180 caixas na prateleira, em quarentena. No pé, a conta 276 + 24 + 180 = 480 caixas e o selo A soma fecha com o recebido. Marcado Exemplo fictício.',caption:'Exemplo fictício: fornecedor, clientes, nota e quantidades inventados; espessura dos galhos proporcional às caixas. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      "torno-artigo-pt-20261106-sistema-multilingue": [{"asset": "./torno-sistema-multilingue-percurso.svg", "alt": "Caderno editorial aberto com a mesma solicitação fictícia em português e inglês, com formulário, confirmação e mensagem como partes do mesmo percurso.", "caption": "O percurso representa uma pergunta de escopo, não uma tela de sistema existente. Ilustração original Torno Studio, 2026.", "className": ["blog-figure"]}],
      "torno-artigo-pt-20261109-acoes-lote": [{"asset": "./torno-lote-resultados.svg", "alt": "Diagrama de uma seleção de 12 solicitações fictícias dividida em 8 concluídas, 2 recusadas, 1 ignorada e 1 com resultado a confirmar.", "caption": "Distribuição hipotética para explicar a conferência por item. Ilustração original Torno Studio, 2026.", "className": ["blog-figure"]}, {"asset": "./torno-lote-retomada.svg", "alt": "Fluxo de retomada com três caminhos: preservar itens concluídos, corrigir recusas antes de repetir e consultar resultados incertos antes de decidir.", "caption": "Fluxo conceitual de decisão, sem representar uma interface ou implementação existente. Ilustração original Torno Studio, 2026.", "className": ["blog-figure"]}],
      'torno-artigo-pt-20261109-marketplace-estoque': [
        {asset:'./torno-marketplace-camadas-estoque.svg',alt:'Barra empilhada fictícia do saldo do SKU CAN-042: físico 20 dividido em reservado 3, bloqueado 2, margem de segurança 2 e disponível para publicar 13, com a fórmula 20 − 3 − 2 − 2 = 13 e a marcação Exemplo fictício.',caption:'Exemplo fictício: SKU e saldos imaginários; as camadas são uma proposta de modelagem, não termos do marketplace. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-marketplace-ultima-unidade.svg',alt:'Ilustração editorial fictícia: prateleira com a última unidade do SKU CAN-042; abaixo, a loja própria com pedido no balcão às 14:02:10 e uma tela genérica de marketplace, sem logotipo, com pedido confirmado às 14:02:11, ambos apontando para a mesma caixa; no pé, o quadro Qual regra o sistema aplica? com três opções: reservar para o primeiro pedido confirmado, publicar com margem de segurança, cancelar um dos pedidos e avisar o comprador. Marcado Exemplo fictício.',caption:'Exemplo fictício: SKU, horário e canais imaginários. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261109-pix-automatico': [
        {asset:'./torno-pix-regua-parcela.svg',alt:'Régua de dias fictícia da mensalidade de dezembro de uma escola, com vencimento em 10/12/2026: faixa de envio da cobrança de 30/11 a 08/12 (10 a 2 dias antes); véspera 09/12 com dois marcadores, recebedor cancela cobrança até 22h e pagador cancela agendamento até 23h59; dia 10/12 com duas janelas de tentativa, 0h às 8h e 18h às 21h; após o vencimento, até 3 datas de nova tentativa até 17/12, marcadas “só se a recorrência permitir”.',caption:'Exemplo fictício: escola, datas e janelas aplicadas a uma parcela imaginária, conforme o Guia de implementação do Pix Automático do BCB consultado em 09/11/2026. Os prazos combinados entre recebedor e PSP podem ser mais curtos. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-pix-tres-chaves.svg',alt:'Chaveiro fictício com três etiquetas presas no mesmo aro: etiqueta grande “idRec — contrato C-0312, mensalidade, valor variável, novas tentativas: sim”; etiqueta média “txid — parcela dez/2026, R$ 980,00, vencimento 10/12”; duas etiquetas pequenas penduradas no txid, “endToEndId 1 — tentativa 10/12, sem saldo” e “endToEndId 2 — tentativa 14/12, liquidado”.',caption:'Exemplo fictício: contrato, parcela, valores e identificadores encurtados para leitura; os reais têm formato definido pelo BCB. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261109-comissao-vendedores': [
        {asset:'./torno-comissao-faixas.svg',alt:'Gráfico de degraus fictício: comissão no eixo vertical e vendas do mês no eixo horizontal, de R$ 0 a R$ 120.000,00, com faixas de 2% até R$ 50.000,00, 3% até R$ 100.000,00 e 4% acima. A linha da faixa sobre o total salta de R$ 1.000,00 para R$ 1.500,03 em R$ 50.001,00 e de R$ 3.000,00 para R$ 4.000,04 em R$ 100.001,00, terminando em R$ 4.800,00. A linha da faixa marginal sobe sem saltos: R$ 1.000,00 em R$ 50.000,00, R$ 2.500,00 em R$ 100.000,00, R$ 2.500,04 em R$ 100.001,00 e R$ 3.300,00 em R$ 120.000,00. Destaque: R$ 1,00 a mais de venda, R$ 1.000,04 a mais de comissão.',caption:'Exemplo fictício: faixas e valores não são recomendação de política de comissão. A escolha entre faixa marginal e faixa sobre o total é da empresa. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-comissao-extrato.svg',alt:'Extrato fictício do vendedor V-07, outubro de 2026, com quatro linhas: parcela 1/2 do Pedido P-1201 recebida, base R$ 5.000,00, 3%, R$ 150,00, regra v2; parcela 2/2 do Pedido P-1188 recebida, base R$ 4.000,00, 2%, R$ 80,00, regra v1, com balão de contestação “pedido aceito em 02/10; não seria a v2?”, em análise pelo financeiro; devolução do Pedido P-1150, base R$ 1.000,00, estorno de R$ 20,00 pela regra v1; ajuste de faixa, base do mês R$ 8.000,00 acima da meta de R$ 6.000,00, mais 0,5%, R$ 40,00, regra Faixas v1. Total: R$ 250,00, uma linha em contestação.',caption:'Exemplo fictício: vendedor, pedidos, regras e valores não vêm de empresa ou sistema real. Cada linha mostra a regra e a versão que a gerou. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261107-conciliacao-bancaria': [
        {asset:'./torno-conciliacao-encaixe.svg',alt:'Peças de encaixe ligam lançamentos fictícios do banco (extrato e retorno), à esquerda, a pedidos e títulos do sistema, à direita: Pix de R$ 1.250,00 com txid T-0042 no Pedido P-0042 (Cliente C-01); crédito de R$ 978,50 do nosso número NN-0007, informado no retorno CNAB, no título de R$ 1.000,00 (Cliente C-02), com tarifa de R$ 21,50; Pix de R$ 430,00 sem txid no Pedido P-0051 (Cliente C-03) só por valor, data e pagador, com a ressalva “sugestão, confirmar”; crédito de R$ 215,90 sem identificação, sem par.',caption:'Exemplo fictício: clientes, pedidos, chaves e valores não vêm de banco ou sistema real; identificadores encurtados para leitura; no teste, use o formato exigido pelo banco. A chave forte encaixa sozinha; valor e data só sugerem. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-conciliacao-bandejas.svg',alt:'Mesa de triagem com três bandejas fictícias. Conciliado: Pedido P-0042 com Pix de R$ 1.250,00; título NN-0007 pago R$ 1.000,00, tarifa R$ 21,50, crédito R$ 978,50. Exceção para decisão humana: crédito de R$ 215,90 sem identificação; P-0051 sugerido por valor e data; devolução Pix de R$ 100,00 do P-0042. Rejeitado: arquivo com trailer que não confere, recusado inteiro; registro 14 com data inválida, recusado sozinho.',caption:'Exemplo fictício: itens e arquivos não vêm de banco ou sistema real. A decisão sobre cada exceção é da empresa. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261106-lgpd-pedido-titular': [
        {asset:'./torno-lgpd-camadas.svg',alt:'Corte de solo fictício intitulado “Um pedido, cinco camadas e uma raiz”: na superfície, o pedido do Titular T-01; abaixo, cadastro, anexos, histórico e log, mensagens enviadas e backup, cada camada com a decisão a tomar (no histórico e log, decidir o que manter do atendimento); uma raiz lateral chega a um sistema integrado, com a nota de comunicar quem recebeu os dados.',caption:'Exemplo fictício: o Titular T-01 e as decisões por camada não representam sistema ou cliente real. Eliminar, anonimizar ou manter é decisão da empresa, com o jurídico. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-lgpd-envelope-resposta.svg',alt:'Envelope aberto com cinco folhas da declaração completa a um pedido fictício: confirmação de tratamento, origem dos dados, inexistência de registro (se for o caso), critérios utilizados e finalidade do tratamento. Um carimbo traz a data do pedido, 03/11, e o prazo de até 15 dias para a declaração completa (art. 19, II, da LGPD), com o rótulo Exemplo fictício.',caption:'Exemplo fictício: datas e conteúdo não vêm de um pedido real. O conteúdo de cada resposta é definido pela empresa, com o encarregado. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261106-dados-maquina-erp': [
        {asset:'./torno-dados-maquina-lentes.svg',alt:'Três lentes de aumento sobre um mesmo dado fictício: sinal da máquina, significado no processo e registro no ERP. As lentes mostram que cada etapa precisa de uma resposta distinta.',caption:'As lentes representam perguntas para o projeto, não uma interface pronta nem uma arquitetura industrial. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-dados-maquina-ficha.svg',alt:'Ficha visual fictícia de uma leitura industrial, com campos de origem, tempo, significado e decisão de conferência; um selo destaca que o valor lido ainda não é produção aprovada.',caption:'Ficha ilustrativa com dados inventados. Não representa tela, equipamento ou projeto de cliente. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261106-versionamento-api': [
        {asset:'./torno-versoes-ponte.svg',alt:'Ilustração de uma ponte entre dois cais, versão atual e versão nova, com uma carga fictícia que precisa chegar ao mesmo destino de negócio.',caption:'A ponte representa uma migração a conferir; não é arquitetura nem resultado de cliente. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-versoes-lupa.svg',alt:'Cena editorial de duas folhas de resposta de API fictícias sob uma lupa; a lupa destaca que o nome e o valor de um campo mudaram, enquanto o significado de negócio ainda precisa de conferência.',caption:'Respostas e lupa são fictícias. A figura ilustra uma pergunta de aceite, não uma tela ou teste realizado. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261015-criterios-aceite-mvp': [
        {asset:'./torno.svg',alt:'Diagrama de critérios de aceite para portal de pedidos hipotético: contexto, ação, resultado e evidência; três cenários: pedido válido, informação incompleta e nova tentativa após perda da resposta.',caption:'Diagrama original preparado para este artigo. Os cenários são hipotéticos.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias': [
        {asset:'./evidencias-decisao.svg',alt:'Sequência de avaliação: reproduzir o fluxo, localizar dependências, testar recuperação e comparar alternativas.',caption:'Figura 1. Evidências que conectam o problema operacional à decisão de investimento. Diagrama original Torno Studio.',className:['blog-figure','blog-figure--rebuild']},
        {asset:'./exemplo-aprovacao.svg',alt:'Exemplo hipotético: preservar cadastro e histórico, investigar a regra de aprovação e verificar os relatórios afetados.',caption:'Figura 2. Exemplo hipotético, sem dados de clientes: o limite da correção depende das relações entre os módulos. Diagrama original Torno Studio.',className:['blog-figure','blog-figure--rebuild']},
      ],
      'torno-artigo-pt-20261015-integracao-erp-briefing': [
        {asset:'./integracao-erp-fluxo.svg',alt:'Mapa hipotético: aprovação comercial no CRM gera envio ao ERP; identificador e situação retornam ao CRM. É preciso definir onde cada cadastro pode ser alterado.',caption:'Exemplo hipotético. Direção dos dados e permissões devem ser confirmadas para os sistemas envolvidos.',className:['blog-figure','blog-figure--erp']},
        {asset:'./integracao-erp-pendencias.svg',alt:'Briefing em três grupos: confirmado com documentação; a confirmar com responsável e impacto; fora da primeira etapa com exclusões registradas.',caption:'Modelo de organização do briefing. Os itens são ilustrativos, sem relação com um cliente real.',className:['blog-figure','blog-figure--erp']},
      ],
      'torno-artigo-pt-20261016-migracao-dados-validacao': [
        {asset:'./migracao-validacao.svg',alt:'Fluxo de migração: origem e mapa, ensaio, conciliação e decisão de corte; divergências retornam à correção e a novos testes.',caption:'A decisão de corte depende do ensaio e da conciliação; divergências pedem nova validação. Crédito: Torno.',className:['blog-figure']},
        {asset:'./migracao-corte.svg',alt:'Etapas do corte: controlar gravações, concluir alterações e conciliar, decidir entre liberar e retornar e abrir o destino; retorno posterior exige preservar novas gravações.',caption:'Combine checagens, liberação e condições de retorno antes da troca. Crédito: Torno.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261019-passagem-tecnica-fornecedor': [
        {asset:'./torno-inventario-passagem.svg',alt:'Inventário para trocar fornecedor de software em três grupos: código e histórico; ambientes e dados; acessos e responsáveis por cada conta.',caption:'Inventário ilustrativo dos ativos a localizar e verificar na passagem técnica. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-transferencia-verificacao.svg',alt:'Sequência de passagem técnica: mapear ativos e responsáveis, transferir acessos com registro, testar build, deploy e recuperação, e revogar acessos antigos após aceite.',caption:'Sequência ilustrativa de transferência e verificação, a adaptar ao contrato e ao risco. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261019-erro-intermitente-evidencias': [
        {asset:'./torno-ficha-erro-intermitente.svg',alt:'Ficha de erro intermitente com três grupos: resultado esperado e observado, contexto da ocorrência e evidências sem dados sensíveis.',caption:'Campos para separar fatos observados de hipóteses num relato de erro intermitente. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-fluxo-erro-intermitente.svg',alt:'Quatro etapas para tratar evidências de erro intermitente: registrar, preservar com acesso controlado, investigar padrões e conferir o comportamento no cenário relatado.',caption:'Sequência ilustrativa de captura e verificação, com registro da incerteza quando o erro não se reproduz. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261019-priorizar-mudancas-mvp': [
        {asset:'./torno-sinais-ficha-decisao.svg',alt:'Sinais de uso observado, relatos de pessoas e restrições técnicas convergem em uma ficha com hipótese, fontes, opção e motivo da decisão.',caption:'Modelo para reunir contexto antes de decidir uma mudança no MVP. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-ciclo-priorizacao-mvp.svg',alt:'Quatro etapas para decidir mudanças após o MVP: observar sinais, formular hipótese, testar em pequeno escopo e registrar a decisão e seus limites.',caption:'Sequência ilustrativa de decisão após uso real, sem pontuação ou resultado presumido. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261020-prova-restauracao-backup': [
        {asset:'./torno-prova-fluxo-restauracao.svg',alt:'Quatro partes da prova de restauração: identificar a cópia, demonstrar teste em ambiente separado, conferir dados e funções, e registrar o que passou, falhou ou ficou fora.',caption:'Peça evidências do teste controlado, das conferências e dos limites encontrados. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-ficha-prova-restauracao.svg',alt:'Ficha de leitura da prova de restauração com escopo, resultado, lacunas e próxima decisão, incluindo evidência e responsável.',caption:'Use escopo, resultado, lacunas e responsável para ler o relatório de restauração. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261020-teste-carga-evidencias': [
        {asset:'./torno-carga-cenario.svg',alt:'Mapa de cenário para teste de carga: perfis e horários, ações e dados, ambiente e diferenças, dependências reais ou simuladas.',caption:'Diagrama original: descreva o cenário antes de interpretar a carga. Crédito: Torno, 2026.',className:['blog-figure']},
        {asset:'./torno-carga-relatorio.svg',alt:'Leitura do relatório de carga: metas acordadas, falhas e percentis, limites do ensaio, decisão documentada e próximo teste.',caption:'Diagrama original: relacione resultados, limites e próxima decisão. Crédito: Torno, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261020-evento-duplicado': [
        {asset:'./mesmo-evento-efeito.svg',alt:'Exemplo fictício: a aprovação cria uma tarefa, sua reentrega deve preservar esse resultado e uma nova mudança no mesmo objeto precisa ser considerada conforme a regra.',caption:'Exemplo fictício de resultado a combinar: conferir o efeito da repetição e distinguir uma atualização legítima. Crédito: Torno Studio.',className:['blog-figure']},
        {asset:'./aceite-evidencias.svg',alt:'Ficha visual de aceite com repetição e entregas próximas, falha antes ou após o registro, nova mudança legítima e conclusão com versão, efeitos conferidos e limites.',caption:'O teste de aceite reúne cenários, evidências e limites do que foi demonstrado. Crédito: Torno Studio.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261021-permissoes-acesso': [
        {asset:'./matriz-permissoes.svg',alt:'Matriz ilustrativa com ações de operador na unidade e gestor na organização, distinguindo consulta, alteração, exportação e condições de acesso.',caption:'Matriz ilustrativa; papéis, escopos e condições precisam ser definidos para o software real. Crédito: Torno Studio.',className:['blog-figure']},
        {asset:'./regra-cenarios-evidencia.svg',alt:'Sequência para escrever a regra de acesso, conferir cenários permitidos e negados e registrar evidências do aceite com dados de teste.',caption:'Roteiro ilustrativo para verificar regras de acesso em ambiente autorizado, com dados de teste. Crédito: Torno Studio.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261021-trilha-auditoria': [
        {asset:'./ficha-evento-auditoria.svg',alt:'Ficha de evento de um sistema fictício com alteração de status, conta de teste, pedido fictício, instante com fuso, resultado e identificadores para investigação.',caption:'Campos ilustrativos para discutir o registro de eventos; o exemplo usa um sistema fictício. Crédito: Torno Studio.',className:['blog-figure']},
        {asset:'./do-evento-a-evidencia.svg',alt:'Três etapas para definir eventos, acesso e retenção, excluir dados desnecessários e demonstrar consulta e exportação com ações aceitas e negadas em ambiente de teste.',caption:'Roteiro ilustrativo para pedir uma demonstração com evidências e limites documentados. Crédito: Torno Studio.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261021-plano-rollback': [
        {asset:'./torno-rollback-gatilhos-responsaveis.svg',alt:'Quatro acordos para o plano de rollback: sinal e evidência, decisão e cobertura, execução e destino, validação e comunicação.',caption:'Proposta editorial para ligar sinais de ação às responsabilidades antes da publicação. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-rollback-limites-verificacao.svg',alt:'Quatro conferências do retorno de uma versão: compatibilidade dos dados, efeitos externos, ensaio pertinente e verificação após a reversão.',caption:'Proposta editorial para conferir os limites do retorno e guardar evidências da decisão e do resultado. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261022-acessibilidade-aceite': [
        {asset:'./torno-acessibilidade-fluxo-aceite.svg',alt:'Quatro acordos para o aceite: tarefa e perfil, estados e dependências, referência e alcance, demonstração humana do fluxo.',caption:'Proposta editorial para definir o fluxo; verificações iniciais não comprovam conformidade WCAG. Crédito: Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-acessibilidade-evidencia-pendencias.svg',alt:'Sequência para documentar o aceite: identificar o ensaio, comparar resultados, declarar o alcance e verificar a correção.',caption:'Relacione a evidência ao cenário avaliado e mantenha pendências com encaminhamento explícito. Crédito: Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261022-ambiente-homologacao': [
        {asset:'./torno-homologacao-conexoes-ambiente.svg',alt:'Mapa de conferência liga a aplicação em homologação às perguntas sobre banco de dados, arquivos e serviços externos, incluindo possíveis ligações com produção.',caption:'Mapa editorial de perguntas ao responsável; não representa uma arquitetura real nem comprova isolamento. Crédito: Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-homologacao-destino-pendente.svg',alt:'Um destino não confirmado mantém o cenário pendente; o responsável verifica a configuração antes do teste, e o resultado deve declarar seus limites.',caption:'O destino de uma ação deve ser confirmado antes do cenário; uma simulação não prova a troca real. Crédito: Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261022-monitoramento-alertas': [
        {asset:'./torno-acordo-alerta-fluxo.svg',alt:'Ficha do alerta liga fluxo e impacto a sinal, janela, condição, destinatário, cobertura, ação e teste.',caption:'Proposta editorial de acordo por alerta, com condições próprias do sistema e cobertura combinada. Crédito: Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-ensaio-cadeia-alerta.svg',alt:'Ensaio controlado percorre condição, detecção, entrega, confirmação e ação; injetar mensagem no canal não testa coleta e regra.',caption:'Registre cada etapa demonstrada e seus limites; receber o aviso não comprova ação ou resolução. Crédito: Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261023-limites-api-cota': [
        {asset:'./torno-api-cota-pendencia.svg',alt:'Ao atingir a cota, a integração reconhece a regra do provedor, mantém a pendência visível, espera conforme a API e retoma de forma controlada.',caption:'Proposta editorial de comportamento ao atingir a cota; fila e espera não garantem conclusão. Crédito: Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-api-cota-evidencia.svg',alt:'Ficha de evidência verifica condição do ensaio, espera visível, retomada, resultados e limites de uma resposta simulada ou de um teste real.',caption:'Peça evidências antes, durante e depois da restrição, declarando o que não foi demonstrado. Crédito: Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261023-importacao-planilhas-erros': [
        {asset:'./torno-importacao-fluxo.svg',alt:'Fluxo proposto para receber o arquivo, interpretar o modelo, validar registros, aplicar a política de gravação e apresentar um resultado verificável.',caption:'Roteiro ilustrativo da importação; a política de gravação depende do acordo do produto. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-importacao-erros.svg',alt:'Modelo fictício de devolutiva com linha, campo, motivo e ação de correção, distinguindo arquivo inválido de registro inválido e os totais lidos, previstos e gravados.',caption:'Campos propostos para conferir o resultado e orientar a correção, com dados fictícios. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261023-datas-fusos': [
        {asset:'./torno-datas-regras.svg',alt:'Três significados para datas e horários: data civil, instante e agendamento futuro, definidos antes da representação técnica.',caption:'Perguntas propostas para definir o significado dos campos e a referência do negócio. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-datas-aceite.svg',alt:'Matriz de aceite com campo, significado, referência de fuso, corte, exibição e relatório, para combinar a regra e a evidência.',caption:'Roteiro ilustrativo para conferir regras temporais nos limites relevantes do processo. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261026-edicao-simultanea': [
        {asset:'./torno-edicao-simultanea-fluxo.svg',alt:'Duas sessões leem a mesma versão inicial, alteram campos diferentes e tentam salvar; a regra e a ordem determinam o resultado a conferir.',caption:'Cenário editorial para combinar o resultado das gravações e conferir o estado final, sem impor um mecanismo. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-edicao-simultanea-aceite.svg',alt:'Matriz para edição simultânea que organiza cenário, regra, resultado esperado, evidência e pendência.',caption:'Descreva o resultado de cada cenário e preserve evidências do que ficou salvo e do que continua pendente. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261026-exportacao-dados': [
        {asset:'./torno-exportacao-contrato.svg',alt:'Contrato ilustrativo da exportação com finalidade, conjunto e filtros, campos e significados, formato e destino previsto para a conferência.',caption:'Decisões propostas para definir o arquivo recorrente antes do aceite. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-exportacao-aceite.svg',alt:'Ficha de conferência da exportação com escopo, contagens, campos críticos, limites, resultado e pendências.',caption:'Roteiro ilustrativo para conferir o conteúdo e o uso do arquivo, além do download. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261026-emails-sistema': [
        {asset:'./torno-email-etapas.svg',alt:'Etapas de uma notificação do sistema, distinguindo evento de negócio, mensagem, aceitação pelo provedor e servidor destinatário, com leitura não comprovada.',caption:'Fronteiras propostas para discutir estados e evidências; os eventos disponíveis dependem do provedor. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-email-evidencias.svg',alt:'Ficha de evidências de e-mail com identificação, estado conhecido, fonte da confirmação, próxima ação e limites do ensaio.',caption:'Campos propostos para relacionar a mensagem ao resultado observado e às pendências. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261027-anexos': [
        {asset:'./torno-anexo-estados.svg',alt:'Estados ilustrativos do anexo, distinguindo seleção, envio, confirmação do vínculo e disponibilidade para consulta, com pendências e falhas explícitas.',caption:'Etapas propostas para discutir a confirmação e a consulta do documento; os estados concretos dependem da solução. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-anexo-aceite.svg',alt:'Ficha de aceite de anexos com regras de envio, confirmação, acesso, substituição e falha, relacionando resultado esperado, evidência e pendência.',caption:'Conferências propostas para relacionar as regras do anexo ao resultado observado. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261027-fluxo-aprovacao': [
        {asset:'./torno-aprovacao-estados.svg',alt:'Estados e decisões ilustrativos: solicitação, análise por ator autorizado e opções de devolver, aprovar ou rejeitar, com pergunta sobre mudanças nos dados.',caption:'Caminhos propostos para discutir estados e decisões; não representam um fluxo já implementado. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-aprovacao-aceite.svg',alt:'Quatro cenários de aceite do fluxo de aprovação: aprovação, devolução, ausência do responsável e dados alterados, cada um com perguntas sobre resultado e evidência.',caption:'Conferências propostas para relacionar estados, responsáveis e consequências observadas. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261027-busca-filtros': [
        {asset:'./torno-busca-contrato.svg',alt:'Contrato da consulta reúne escopo autorizado, campos e correspondência, filtros, ordenação e continuidade entre páginas.',caption:'Defina o significado da consulta e o conjunto que cada resultado representa; busca e exportação têm regras distintas. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-busca-aceite.svg',alt:'Cenários de aceite verificam termo e filtros, consulta sem resultado ou com erro, ordem e páginas, além do escopo por perfil.',caption:'Compare esperado e observado com um conjunto de teste conhecido e preserve evidências e pendências. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261028-recuperacao-senha': [
        {asset:'./torno-recuperacao-etapas.svg',alt:'Perguntas da recuperação de senha cobrem pedido e resposta, canal, validade da instrução, alteração da senha e efeitos sobre sessões.',caption:'Defina o comportamento e os limites de cada etapa; trocar a senha não define sozinho os efeitos sobre sessões. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-recuperacao-aceite.svg',alt:'Cenários de aceite incluem link expirado ou usado, canal indisponível, resposta para conta inexistente e tratamento das sessões existentes.',caption:'Confira resultados com contas e destinos de teste autorizados e registre evidências, limites e pendências. Diagrama original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261028-arquivar-excluir': [
        {asset:"./torno-registros-acoes.svg",alt:"Perguntas distintas para arquivar, inativar ou excluir: estado do registro, consulta, uso em novas operações, remoção e vínculos relacionados.",caption:"Decisões propostas para esclarecer o efeito de cada ação, sem uma política universal. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
        {asset:"./torno-registros-aceite.svg",alt:"Ficha de aceite sobre dependentes, perfis, consulta, retomada quando contratada e resultado observado, com evidências e pendências.",caption:"Conferências propostas para verificar os efeitos e os limites das ações sobre registros. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
      ],
      'torno-artigo-pt-20261028-cancelamento-solicitacao': [
        {asset:"./torno-cancelamento-estados.svg",alt:"Perguntas para distinguir solicitação recebida, estado da operação, efeitos já concluídos, dependências externas e resultado com pendências.",caption:"Fronteiras propostas para conferir o efeito do pedido de cancelamento. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
        {asset:"./torno-cancelamento-aceite.svg",alt:"Cinco cenários de aceite do cancelamento: antes do início, em curso, depois de concluída a operação, com serviço externo e com demora ou resultado incerto.",caption:"Perguntas propostas para conferir resultados, efeitos e pendências em cada cenário. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
      ],
      'torno-artigo-pt-20261029-valores-monetarios': [
        {asset:"./torno-monetarios-regras.svg",alt:"Ficha de regras para valores monetários com moeda e unidade, precisão, etapa, regra de arredondamento e total e consistência.",caption:"Perguntas propostas para definir o significado e o cálculo antes de conferir os valores. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
        {asset:"./torno-monetarios-aceite.svg",alt:"Ficha de evidências com entrada, cálculo intermediário, resultado esperado, tela e integração, e evidência e pendência.",caption:"Conferências propostas para comparar entradas, regras e saídas com o resultado esperado. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
      ],
      'torno-artigo-pt-20261029-eventos-fora-ordem': [
        {asset:"./torno-eventos-ordem.svg",alt:"Exemplo abstrato em que a mudança A ocorre antes de B, mas o evento de B chega primeiro; a regra de tratamento depende de contexto, referência e transições permitidas.",caption:"Ordem de ocorrência e ordem de chegada são perguntas distintas para o contrato da integração. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
        {asset:"./torno-eventos-aceite.svg",alt:"Cinco cenários de aceite: chegada invertida, evento anterior recebido depois, mesma ocorrência repetida, mudança legítima posterior e referência ou conferência ausente.",caption:"Perguntas propostas para conferir resultados, efeitos autorizados e pendências em cada cenário. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
      ],
      'torno-artigo-pt-20261029-liberacao-gradual': [
        {asset:"./torno-piloto-escopo.svg",alt:"Escopo do piloto distingue elegibilidade, pessoas dentro e fora do grupo, convivência dos caminhos e permissões para agir.",caption:"Combine quem recebe a mudança, qual fluxo fica disponível e o destino das tarefas em andamento. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
        {asset:"./torno-piloto-decisao.svg",alt:"Decisão do piloto reúne observação, opções de ampliar, manter ou pausar, responsáveis e limites sobre efeitos anteriores.",caption:"Relacione evidências e pendências à decisão, com responsável e alcance da ação definidos. Diagrama original Torno Studio, 2026.",className:['blog-figure']},
      ],
      'torno-artigo-pt-20261030-sistema-sem-internet': [
        {asset:"./torno-offline-mapa.svg",alt:"Mapa conceitual distingue dados no aparelho, confirmação no servidor e a fronteira da conexão, com perguntas sobre disponibilidade e gravação.",caption:"Delimite a tarefa e confira a evidência em cada lugar; voltar a conexão não comprova sincronização concluída. Ilustração original Torno Studio, 2026.",className:['blog-figure']},
        {asset:"./torno-registro-passaporte.svg",alt:"Caderno editorial aberto reúne perguntas sobre identidade e atualização do registro, confirmação no destino, persistência local e divergências.",caption:"Registre o que pode ser comprovado, as condições de preservação e as pendências; a ficha não representa uma interface de produto. Ilustração original Torno Studio, 2026.",className:['blog-figure']},
      ],
      'torno-artigo-pt-20261104-agendamento-reserva-dupla': [
        {asset:'./torno-agenda-sobreposicao.svg',alt:'Régua de horários de uma sala fictícia, com duas faixas de reserva parcialmente sobrepostas e a área de conflito destacada.',caption:'Defina o intervalo que bloqueia o recurso, inclusive preparo quando aplicável. Horários e sala são fictícios; ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-agenda-duas-tentativas.svg',alt:'Dois comprovantes fictícios de tentativa para a mesma Sala Azul: um confirmado e outro recusado, com próxima ação visível para o solicitante.',caption:'Duas pessoas podem ver a vaga; só o resultado de confirmação decide a reserva. Cena fictícia; ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261104-web-push-pwa': [
        {asset:'./torno-push-quatro-telas.svg',alt:'Quadro editorial com quatro aparelhos fictícios lado a lado — iPhone com o app na Tela de Início, iPhone com o site aberto no Safari, Android e computador — cada um com uma etiqueta do que verificar no aceite.',caption:'Ilustração original Torno Studio, 2026. Aparelhos e etiquetas são fictícios; não representam a interface de um sistema real.',className:['blog-figure']},
        {asset:'./torno-push-validade.svg',alt:'Ilustração de um envelope de aviso com um carimbo de validade ao lado de uma ampulheta, indicando que uma mensagem push pode expirar antes de chegar ao aparelho.',caption:'Ilustração original Torno Studio, 2026. O envelope e o carimbo representam o tempo de vida (TTL) de uma mensagem; não mostram dados reais.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261105-sessao-formulario': [
        {asset:'./torno-sessao-formulario.svg',alt:'Ilustração de um formulário fictício com campos preenchidos, um relógio de sessão e três pontos de decisão: aviso, rascunho e retomada.',caption:'Cena conceitual fictícia para discutir requisitos; não representa tela de um produto. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-sessao-ensaios.svg',alt:'Ilustração original em formato de bilhete de ensaio com três situações: sessão ativa, vencida e novo login por outra pessoa.',caption:'Bilhete de ensaio fictício; os resultados esperados devem ser definidos para o sistema real. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261105-nfe-ibs-cbs': [
        {asset:'./torno-nfe-regua-datas.svg',alt:'Escada de três degraus com as datas de obrigatoriedade: 03/08/2026, campos de IBS e CBS obrigatórios na NF-e e NFC-e; 01/12/2026, NF-e de quem não é contribuinte do ICMS; 01/01/2027, Simples Nacional, tributação monofásica e Duimp. Abaixo, um quadro tracejado com o texto "validação que rejeita a nota: adiada, sem data".',caption:'Datas segundo o Ato Conjunto RFB/CGIBS nº 4/2026; adiamento da validação segundo o CGIBS em 06/08/2026. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-nfe-dois-carimbos.svg',alt:'Ilustração de uma nota fiscal fictícia com um carimbo "Autorizada" e, ao lado, uma ficha de conferência com quatro itens: classificação definida pelo contador, código vigente na data, itens somam o total e XML guardado.',caption:'Exemplo fictício: a nota não contém dados reais. O carimbo de autorização não substitui a ficha de conferência. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261105-campos-condicionais': [
        {asset:'./torno-campos-condicionais-matriz.svg',alt:'Matriz editorial fictícia que compara as respostas sim e não para fornecedor escolhido, mostrando campo visível, exigência e perguntas sobre o destino do valor anterior.',caption:'Matriz de requisitos inventada para discussão, sem representar um formulário existente. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-formulario-duas-respostas.svg',alt:'Cena editorial de um formulário fictício em duas versões: primeiro com fornecedor preenchido, depois com a resposta alterada e o destino do valor anterior em aberto.',caption:'Duas etapas fictícias da mesma solicitação; não reproduzem tela real nem comprovam comportamento implementado. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261105-substituto-aprovador': [
        {asset:'./torno-ausencia-agenda.svg',alt:'Agenda fictícia com período de ausência e uma faixa de substituição limitada àquele intervalo.',caption:'Agenda editorial fictícia. A faixa ilustra início e fim de uma delegação, sem representar um produto existente. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-substituto-ficha.svg',alt:'Ficha editorial fictícia com escopo da substituição, limites e três cenários de teste.',caption:'Ficha para discutir critérios de aceite, não registro de delegação real. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261104-pagamentos-status': [
        {asset:'./torno-pagamentos-prancheta.svg',alt:'Prancheta editorial com um pedido fictício à esquerda e três carimbos distintos de pagamento: pendente, aprovado e recusado.',caption:'Ilustração original Torno Studio, 2026. Pedido e carimbos são fictícios; não representam a interface de um provedor.',className:['blog-figure']},
        {asset:'./torno-pagamentos-ensaio.svg',alt:'Página ilustrada de ensaio com quatro linhas de pedidos fictícios: retorno antecipado, confirmação posterior, aviso repetido e recusa.',caption:'Folha de ensaio original Torno Studio, 2026. Os pedidos são fictícios e não comprovam teste executado.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261104-dashboard-erp-divergencias': [
        {asset:'./torno-painel-lentes.svg',alt:'Ilustração editorial de uma mesma pilha de pedidos vista por duas lentes, cada uma destacando um conjunto diferente de estados.',caption:'As lentes mostram a importância de declarar o filtro; não representam relatório ou cliente real. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-painel-relogio.svg',alt:'Cena editorial de um relógio próximo a uma fotografia datada do painel e a um registro mais recente na origem, mostrando a diferença entre hora de consulta e hora do dado.',caption:'A fotografia e o relógio ilustram a idade da informação, sem prometer atualização em tempo real. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261103-whatsapp-avisos': [
        {asset:'./torno-whatsapp-pedido.svg',alt:'Ilustração editorial de um pedido fictício com carimbo de estado confirmado e rascunho de mensagem separado, mostrando que o aviso depende da decisão anterior.',caption:'O carimbo e o texto são fictícios e não representam interface, cliente ou mensagem enviada. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-whatsapp-resposta.svg',alt:'Cena editorial de uma conversa fictícia: a dúvida do cliente aparece ao lado de um posto de atendimento humano, sem prometer resposta automática.',caption:'A figura destaca o destino da resposta; balões e pessoas são conceituais. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261103-login-unico-sso': [
        {asset:'./torno-sso-portas.svg',alt:'Ilustração de um acesso corporativo a uma porta de aplicação: identidade reconhecida, mas a decisão de permissão ainda depende da porta correta.',caption:'A porta representa uma decisão de acesso, não uma tela ou controle de segurança real. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-sso-saida.svg',alt:'Ilustração de um crachá com acesso retirado ao lado de um relógio que pergunta se a sessão ainda está aberta.',caption:'Crachá e relógio são símbolos de um ensaio de desligamento, sem representar uma configuração técnica real. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261103-ocr-pdf-revisao': [
        {asset:'./torno-pdf-campos.svg',alt:'Folha fictícia de pedido de compra com campos destacados como lido com clareza, pedir revisão e campo ausente.',caption:'O documento ilustrativo mostra que campos de uma mesma página podem pedir tratamentos diferentes. Não representa um pedido real nem resultado de ferramenta. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-pdf-conferencia.svg',alt:'Mesa de conferência ilustrada: documento de origem à esquerda e lupa sobre o único campo duvidoso antes do registro definitivo.',caption:'A cena ilustra a decisão de revisar uma exceção antes de gravar dados. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261102-assinatura-status': [
        {asset:'./torno-documento-estados.svg',alt:'Documento ilustrativo versão 01 com carimbo Aguardando outra pessoa; rodapé distingue envio, assinatura parcial e conclusão.',caption:'Estados ilustrativos para discutir escopo; não reproduzem a interface de uma plataforma de assinatura. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-assinatura-recibo.svg',alt:'Recibo editorial de conferência reúne versão, signatários, estado confirmado no provedor e retorno ao ERP.',caption:'A ficha mostra o que pedir na demonstração; não é comprovante de assinatura nem resultado de cliente. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261102-leitor-codigo-barras': [
        {asset:'./torno-bancada-leitura.svg',alt:'Bancada conceitual mostra uma etiqueta lida, um item identificado e a decisão operacional que ainda depende do sistema e de uma pessoa.',caption:'A leitura identifica dados; o movimento depende da regra e da confirmação acordadas. Exemplo ilustrativo, sem equipamento ou cliente real. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-etiquetas-ensaio.svg',alt:'Folha editorial de ensaio apresenta etiquetas fictícias para testar leitura normal, código desconhecido, repetição e etiqueta difícil de ler.',caption:'O ensaio compara dados capturados e resultado operacional esperado; símbolos ilustrativos não são códigos válidos. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261102-isolamento-multiempresa': [
        {asset:'./torno-multiempresa-vitrines.svg',alt:'Ilustração editorial de dois arquivos de empresas, com registros próprios e um acesso cruzado barrado.',caption:'Cada empresa deve encontrar seus dados dentro do alcance contratado; a figura não representa um produto existente. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-multiempresa-ensaio.svg',alt:'Folha ilustrada de ensaio com ações permitidas e recusadas entre duas empresas fictícias.',caption:'A folha organiza perguntas para o aceite; não é prova de teste executado. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261030-mfa-aceite': [
        {asset:'./torno-mfa-duas-portas.svg',alt:'Ilustração conceitual de duas portas: entrada da conta e ação sensível, com requisitos de verificação distintos.',caption:'As portas representam decisões de escopo, não telas ou um produto existente. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
        {asset:'./torno-mfa-caderno-ensaios.svg',alt:'Página ilustrativa de caderno de ensaios para ativação, perda de dispositivo, recuperação e revogação de fator.',caption:'Ficha de teste fictícia para discussão de critérios de aceite; não é prova de um sistema implementado. Ilustração original Torno Studio, 2026.',className:['blog-figure']},
      ],
      'torno-artigo-pt-20261030-agente-erp-permissoes': [
        {asset:"./torno-agente-erp-tres-niveis.svg",alt:"Três cartões distintos mostram consulta, preparação e execução com limites de autorização diferentes.",caption:"Comparação editorial de níveis de ação; não representa uma interface ou implantação real. Ilustração original Torno Studio, 2026.",className:['blog-figure']},
        {asset:"./torno-agente-erp-matriz.svg",alt:"Matriz visual compara impacto de erro e reversibilidade para orientar quando uma ação de agente exige aprovação.",caption:"A classificação deve ser feita com o cliente e validada no seu processo. Ilustração original Torno Studio, 2026.",className:['blog-figure']},
      ],
    };
    const figures=configs[id];if(!figures)return;
    const textOf=node=>node?.type==='text'?node.value:(node?.children??[]).map(textOf).join('');
    const children=tree.children??[];
    for(const cfg of figures){
      let matched=false;
      for(let i=0;i<children.length;i++){
        const paragraph=children[i];if(paragraph?.type!=='paragraph')continue;
        const image=paragraph.children?.find(n=>n.type==='image'&&n.alt===cfg.alt&&n.url===cfg.asset);
        if(!image)continue;
        let next=i+1;while(next<children.length&&children[next]?.type==='text'&&!String(children[next].value??'').trim())next++;
        const cap=children[next];const emphasis=cap?.type==='paragraph'?cap.children?.find(n=>n.type==='emphasis'):null;
        if(!emphasis||textOf(emphasis)!==cfg.caption)throw new Error('[blog] approved diagram lacks exact adjacent caption: '+cfg.asset);
        cap.data={...(cap.data??{}),hName:'figcaption',hProperties:{...(cap.data?.hProperties??{}),className:['blog-figure-caption']}};
        if(id==='torno-artigo-pt-20261015-integracao-erp-briefing'||id==='torno-artigo-pt-20261015-antes-de-refazer-sistema-evidencias'){
          image.data={...(image.data??{}),hProperties:{...(image.data?.hProperties??{}),style:'display:block;inline-size:100%;max-inline-size:100%;block-size:auto;margin-inline:0'}};
        }
        const props={className:cfg.className};
        if(id==='torno-artigo-pt-20261015-integracao-erp-briefing')props.style='max-inline-size:30rem;inline-size:100%;margin-inline:auto;padding:0';
        const figure={type:'figure',data:{hName:'figure',hProperties:props},children:[image,cap]};
        children.splice(i,next-i+1,figure);matched=true;break;
      }
      if(!matched)throw new Error('[blog] approved diagram missing from Markdown AST: '+cfg.asset);
    }
  };
}

/** Rehype: preserve tables inside keyboard-accessible scroll regions. */
export function blogScrollableBlocks({labelTaskLists=true}={}) {
  return (tree, file) => {
    const filepath=[file.path,...(file.history??[])].filter(Boolean).map(String).join(' ').replaceAll('\\','/');
    const frontmatter=file.data?.astro?.frontmatter??{};
    const blogFile=filepath.includes('/content/blog/')||String(frontmatter.content_id??'').startsWith('torno-artigo-pt-');
    const en=frontmatter.locale==='en';
    const nodeText=node=>node.type==='text'?node.value:(node.children??[]).map(nodeText).join('');
    const labelCheckboxes=(node,label)=>{
      if(node.type==='element' && node.tagName==='input' && node.properties?.type==='checkbox') node.properties.ariaLabel=label;
      for(const child of node.children??[])labelCheckboxes(child,label);
    };
    const visit=node=>{
      // Markdown task lists keep disabled state and gain the visible item as their accessible name.
      if(labelTaskLists && blogFile && node.type==='element' && node.tagName==='li') labelCheckboxes(node,nodeText(node).trim());
      if(blogFile && node.type==='element' && node.tagName==='pre'){node.properties??={};node.properties.tabIndex=0;}
      for(let i=0;i<(node.children??[]).length;i++){
        const child=node.children[i];
        visit(child);
        if(blogFile && child.type==='element' && child.tagName==='table'){
          node.children[i]={type:'element',tagName:'div',properties:{className:['blog-table-block']},children:[
            {type:'element',tagName:'p',properties:{className:['blog-table-hint']},children:[{type:'text',value:en?'Scroll horizontally if needed to see all columns.':'Se necessário, role horizontalmente para ver todas as colunas.'}]},
            {type:'element',tagName:'div',properties:{className:['blog-table-scroll'],tabIndex:0,role:'region',ariaLabel:en?'Scrollable table':'Tabela com rolagem horizontal'},children:[child]}
          ]};
        }
      }
    };visit(tree);
  };
}
