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
