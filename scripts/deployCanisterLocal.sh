#!/usr/bin/bash

TIME=$(($(date +%s) * 1000000000))
dfx deploy --argument "(
  record {
    logo = opt(\"El Pais SA\");
    name = opt(\"Acciones El Pais SA\");
    created_at = $TIME;
    upgraded_at = $TIME;
    custodians = vec{principal\"$(dfx identity get-principal)\"};
    symbol = opt(\"EPSA\");
  }
)" dip721
dfx deploy --argument "(
  record {
    custodians = vec{principal\"$(dfx identity get-principal)\"};
  }
)" user
dfx deploy --argument "(
  record {
    custodians = vec{principal\"$(dfx identity get-principal)\"};
  }
)" event
dfx deploy
#dfx canister call nft_container burn_multiple "(principal\"pull7-q674a-k45ci-gofwh-rxtd2-2l6eq-vgbkb-lldde-rbj5z-i6jex-zae\", \"Superacciones1234567890\")"
#dfx canister call registro_acciones getActionsMap
#dfx canister call nft_container mint "(principal\"52zh7-yhqdf-s7ufz-6gcjz-wpohn-m5puo-nbvfs-u7jmm-ekvai-7avbl-qae\", 22, vec{record{\"prueba\"; variant{TextContent=\"prueba\"}}})"
#dfx canister call nft_container burn "(19)"
