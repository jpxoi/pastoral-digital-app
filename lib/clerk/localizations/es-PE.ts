/*
 * =====================================================================================
 * DISCLAIMER:
 * =====================================================================================
 * This localization file is a community contribution and is not officially maintained
 * by Clerk. It has been provided by the community and may not be fully aligned
 * with the current or future states of the main application. Clerk does not guarantee
 * the accuracy, completeness, or timeliness of the translations in this file.
 * Use of this file is at your own risk and discretion.
 * =====================================================================================
 */

export const esPE = {
  locale: 'es-PE',
  apiKeys: {
    action__add: 'Agregar nueva clave de API',
    action__search: 'Buscar claves de API',
    copySecret: {
      formButtonPrimary__copyAndClose: 'Copiar y cerrar',
      formHint: 'Por razones de seguridad, no podrás verlo de nuevo más tarde.',
      formTitle: 'Copia tu clave de API "{{name}}" ahora',
    },
    createdAndExpirationStatus__expiresOn:
      "Creada {{ createdDate | shortDate('es-PE') }} • Expira {{ expiresDate | longDate('es-PE') }}",
    createdAndExpirationStatus__never:
      "Creada {{ createdDate | shortDate('es-PE') }} • Nunca expira",
    detailsTitle__emptyRow: 'No se encontraron claves de API',
    formButtonPrimary__add: 'Crear clave',
    formFieldCaption__expiration__expiresOn: 'Expira {{ date }}',
    formFieldCaption__expiration__never: 'Esta clave nunca expirará',
    formFieldOption__expiration__180d: '180 Días',
    formFieldOption__expiration__1d: '1 Día',
    formFieldOption__expiration__1y: '1 Año',
    formFieldOption__expiration__30d: '30 Días',
    formFieldOption__expiration__60d: '60 Días',
    formFieldOption__expiration__7d: '7 Días',
    formFieldOption__expiration__90d: '90 Días',
    formFieldOption__expiration__never: 'Nunca',
    formHint:
      'Ingresa un nombre para generar una nueva clave de API. Podrás revocarla en cualquier momento.',
    formTitle: 'Agregar nueva clave de API',
    lastUsed__days: 'hace {{days}}d',
    lastUsed__hours: 'hace {{hours}}h',
    lastUsed__minutes: 'hace {{minutes}}m',
    lastUsed__months: 'hace {{months}} meses',
    lastUsed__seconds: 'hace {{seconds}}s',
    lastUsed__years: 'hace {{years}} años',
    menuAction__revoke: 'Revocar clave',
    revokeConfirmation: {
      confirmationText: 'Revocar',
      formButtonPrimary__revoke: 'Revocar clave',
      formHint: '¿Estás seguro de que quieres eliminar esta clave secreta?',
      formTitle: '¿Revocar la clave secreta "{{apiKeyName}}"?',
    },
  },
  backButton: 'Atrás',
  badge__activePlan: 'Activo',
  badge__canceledEndsAt: "Cancelado • Termina {{ date | shortDate('es-PE') }}",
  badge__currentPlan: 'Plan actual',
  badge__default: 'Por defecto',
  badge__endsAt: "Termina {{ date | shortDate('es-PE') }}",
  badge__expired: 'Vencido',
  badge__freeTrial: 'Prueba gratuita',
  badge__otherImpersonatorDevice: 'Otro dispositivo de imitación',
  badge__pastDueAt: "Vencido {{ date | shortDate('es-PE') }}",
  badge__pastDuePlan: 'Pago pendiente',
  badge__primary: 'Primario',
  badge__renewsAt: "Se renueva {{ date | shortDate('es-PE') }}",
  badge__requiresAction: 'Requiere acción',
  badge__startsAt: "Empieza {{ date | shortDate('es-PE') }}",
  badge__thisDevice: 'Este dispositivo',
  badge__trialEndsAt: "La prueba termina {{ date | shortDate('es-PE') }}",
  badge__unverified: 'No verificado',
  badge__upcomingPlan: 'Próximo plan',
  badge__userDevice: 'Dispositivo de usuario',
  badge__you: 'Tú',
  billing: {
    addPaymentMethod__label: 'Agregar método de pago',
    alwaysFree: 'Siempre gratis',
    annually: 'Anualmente',
    availableFeatures: 'Características disponibles',
    billedAnnually: 'Facturado anualmente',
    billedMonthlyOnly: 'Solo facturado mensualmente',
    cancelFreeTrial: 'Cancelar prueba gratuita',
    cancelFreeTrialAccessUntil:
      "Tu prueba seguirá activa hasta el {{ date | longDate('es-PE') }}. Después perderás el acceso a las funciones de prueba. No se te cobrará nada.",
    cancelFreeTrialTitle: '¿Cancelar la prueba gratuita del plan {{plan}}?',
    cancelSubscription: 'Cancelar suscripción',
    cancelSubscriptionAccessUntil:
      "Puedes seguir usando las funciones de '{{plan}}' hasta el {{ date | longDate('es-PE') }}, después ya no tendrás acceso.",
    cancelSubscriptionNoCharge: 'No se te cobrará por esta suscripción.',
    cancelSubscriptionPastDue:
      'Tu suscripción finalizará de inmediato y perderás el acceso a todas las funciones del plan. Se te pedirá que pagues el monto pendiente en tu próxima suscripción.',
    cancelSubscriptionTitle: '¿Cancelar la suscripción {{plan}}?',
    cannotSubscribeMonthly:
      'No puedes suscribirte a este plan con pago mensual. Para suscribirte, debes elegir el pago anual.',
    cannotSubscribeUnrecoverable:
      'No puedes suscribirte a este plan. Tu suscripción actual es más cara que este plan.',
    checkout: {
      description__paymentSuccessful: 'Tu nueva suscripción está lista.',
      description__subscriptionSuccessful: 'Tu nueva suscripción está lista.',
      downgradeNotice:
        'Mantendrás tu suscripción actual y sus funciones hasta el final del ciclo de facturación; después se te cambiará a esta suscripción.',
      emailForm: {
        subtitle:
          'Antes de completar la compra, debes agregar un correo electrónico donde se enviarán los recibos.',
        title: 'Agregar correo electrónico',
      },
      lineItems: {
        title__freeTrialEndsAt: 'La prueba termina el',
        title__paymentMethod: 'Método de pago',
        title__statementId: 'Número de factura',
        title__subscriptionBegins: 'La suscripción empieza',
        title__totalPaid: 'Total pagado',
      },
      pastDueNotice: 'Tu suscripción anterior tenía un pago pendiente.',
      perMonth: 'por mes',
      title: 'Pago',
      title__paymentSuccessful: '¡Pago exitoso!',
      title__subscriptionSuccessful: '¡Suscripción lista!',
      title__trialSuccess: '¡La prueba se ha iniciado correctamente!',
      totalDueAfterTrial:
        'Total a pagar cuando termine la prueba en {{days}} días',
    },
    credit: 'Crédito',
    creditRemainder: 'Crédito por el tiempo restante de tu suscripción actual.',
    defaultFreePlanActive: 'Actualmente estás en el plan gratuito',
    free: 'Gratis',
    getStarted: 'Empezar',
    keepFreeTrial: 'Mantener prueba gratuita',
    keepSubscription: 'Mantener suscripción',
    manage: 'Administrar',
    manageSubscription: 'Administrar suscripción',
    month: 'Mes',
    monthly: 'Mensual',
    pastDue: 'Pago pendiente',
    pay: 'Pagar {{amount}}',
    paymentMethod: {
      applePayDescription: {
        annual: 'Pago anual',
        monthly: 'Pago mensual',
      },
      dev: {
        anyNumbers: 'Cualquier número',
        cardNumber: 'Número de tarjeta',
        cvcZip: 'CVC, código postal',
        developmentMode: 'Modo de desarrollo',
        expirationDate: 'Fecha de vencimiento',
        testCardInfo: 'Información de tarjeta de prueba',
      },
    },
    paymentMethods__label: 'Métodos de pago',
    popular: 'Popular',
    pricingTable: {
      billingCycle: 'Ciclo de facturación',
      included: 'Incluido',
    },
    reSubscribe: 'Volver a suscribirse',
    seeAllFeatures: 'Ver todas las funciones',
    startFreeTrial: 'Iniciar prueba gratuita',
    startFreeTrial__days: 'Iniciar prueba gratuita de {{days}} días',
    subscribe: 'Suscribirse',
    subscriptionDetails: {
      beginsOn: 'Comienza el',
      currentBillingCycle: 'Ciclo de facturación actual',
      endsOn: 'Finaliza el',
      firstPaymentAmount: 'Monto del primer pago',
      firstPaymentOn: 'Primer pago el',
      nextPaymentAmount: 'Monto del próximo pago',
      nextPaymentOn: 'Próximo pago el',
      pastDueAt: 'Pago pendiente desde',
      renewsAt: 'Se renueva el',
      subscribedOn: 'Suscrito el',
      title: 'Suscripción',
      trialEndsOn: 'La prueba termina el',
      trialStartedOn: 'La prueba comenzó el',
    },
    subtotal: 'Subtotal',
    switchPlan: 'Cambiar a este plan',
    switchToAnnual: 'Cambiar a anual',
    switchToAnnualWithAnnualPrice:
      'Cambiar a anual {{currency}}{{price}} / año',
    switchToMonthly: 'Cambiar a mensual',
    switchToMonthlyWithPrice: 'Cambiar a mensual {{currency}}{{price}} / mes',
    totalDue: 'Total a pagar',
    totalDueToday: 'Total a pagar hoy',
    viewFeatures: 'Ver funciones',
    viewPayment: 'Ver pago',
    year: 'Año',
  },
  createOrganization: {
    formButtonSubmit: 'Crear organización',
    invitePage: {
      formButtonReset: 'Saltar',
    },
    title: 'Crear organización',
  },
  dates: {
    lastDay: "Ayer a las {{ date | timeString('es-PE') }}",
    next6Days:
      "{{ date | weekday('es-PE','long') }} a las {{ date | timeString('es-PE') }}",
    nextDay: "Mañana a las {{ date | timeString('es-PE') }}",
    numeric: "{{ date | numeric('es-PE') }}",
    previous6Days:
      "Último {{ date | weekday('es-PE','long') }} en {{ date | timeString('es-PE') }}",
    sameDay: "Hoy a las {{ date | timeString('es-PE') }}",
  },
  dividerText: 'o',
  footerActionLink__alternativePhoneCodeProvider:
    'Enviar código por SMS en su lugar',
  footerActionLink__useAnotherMethod: 'Usar otro método',
  footerPageLink__help: 'Ayuda',
  footerPageLink__privacy: 'Privacidad',
  footerPageLink__terms: 'Términos',
  formButtonPrimary: 'Continuar',
  formButtonPrimary__verify: 'Verificar',
  formFieldAction__forgotPassword: '¿Olvidaste tu contraseña?',
  formFieldError__matchingPasswords: 'Las contraseñas coinciden.',
  formFieldError__notMatchingPasswords: 'Las contraseñas no coinciden.',
  formFieldError__verificationLinkExpired:
    'El enlace de verificación expiró. Por favor, vuelve a solicitarlo.',
  formFieldHintText__optional: 'Opcional',
  formFieldHintText__slug:
    'Un slug es un identificador legible que debe ser único. Se utiliza normalmente en las URLs.',
  formFieldInputPlaceholder__apiKeyDescription:
    'Explica por qué estás generando esta clave',
  formFieldInputPlaceholder__apiKeyExpirationDate: 'Seleccionar fecha',
  formFieldInputPlaceholder__apiKeyName:
    'Ingresa el nombre de tu clave secreta',
  formFieldInputPlaceholder__backupCode: 'Ingresa el código de respaldo',
  formFieldInputPlaceholder__confirmDeletionUserAccount: 'Eliminar cuenta',
  formFieldInputPlaceholder__emailAddress: 'Ingresa tu correo electrónico',
  formFieldInputPlaceholder__emailAddress_username:
    'Ingresa el correo electrónico o nombre de usuario',
  formFieldInputPlaceholder__emailAddresses:
    'Ingresa o pega una o más direcciones de correo electrónico, separadas por espacios o comas',
  formFieldInputPlaceholder__firstName: 'Nombre(s)',
  formFieldInputPlaceholder__lastName: 'Apellidos',
  formFieldInputPlaceholder__organizationDomain: 'ejemplo.com',
  formFieldInputPlaceholder__organizationDomainEmailAddress:
    'nombre@ejemplo.com',
  formFieldInputPlaceholder__organizationName: 'Nombre de la organización',
  formFieldInputPlaceholder__organizationSlug: 'mi-organizacion',
  formFieldInputPlaceholder__password: 'Ingresa tu contraseña',
  formFieldInputPlaceholder__phoneNumber: 'Ingresa tu número de celular',
  formFieldInputPlaceholder__username: 'Ingresa tu nombre de usuario',
  formFieldInput__emailAddress_format: 'Formato de ejemplo: nombre@ejemplo.com',
  formFieldLabel__apiKey: 'Clave de API',
  formFieldLabel__apiKeyDescription: 'Descripción',
  formFieldLabel__apiKeyExpiration: 'Expiración',
  formFieldLabel__apiKeyName: 'Nombre de la clave secreta',
  formFieldLabel__automaticInvitations:
    'Activar invitaciones automáticas para este dominio',
  formFieldLabel__backupCode: 'Código de respaldo',
  formFieldLabel__confirmDeletion: 'Confirmación',
  formFieldLabel__confirmPassword: 'Confirmar contraseña',
  formFieldLabel__currentPassword: 'Contraseña actual',
  formFieldLabel__emailAddress: 'Correo electrónico',
  formFieldLabel__emailAddress_username:
    'Correo electrónico o nombre de usuario',
  formFieldLabel__emailAddresses: 'Direcciones de correo',
  formFieldLabel__firstName: 'Nombre',
  formFieldLabel__lastName: 'Apellido',
  formFieldLabel__newPassword: 'Nueva contraseña',
  formFieldLabel__organizationDomain: 'Dominio',
  formFieldLabel__organizationDomainDeletePending:
    'Eliminar invitaciones y sugerencias pendientes',
  formFieldLabel__organizationDomainEmailAddress: 'Verificación de correo',
  formFieldLabel__organizationDomainEmailAddressDescription:
    'Entrar una dirección de correo electrónico bajo este dominio para recibir un código y verificarlo.',
  formFieldLabel__organizationName: 'Nombre de la Organización',
  formFieldLabel__organizationSlug: 'Slug / Identificador',
  formFieldLabel__passkeyName: 'Nombre de llave de acceso',
  formFieldLabel__password: 'Contraseña',
  formFieldLabel__phoneNumber: 'Número de celular',
  formFieldLabel__role: 'Rol',
  formFieldLabel__signOutOfOtherSessions:
    'Cerrar sesión en todos los demás dispositivos',
  formFieldLabel__username: 'Nombre de usuario',
  impersonationFab: {
    action__signOut: 'Cerrar',
    title: 'Registrado como {{identifier}}',
  },
  lastAuthenticationStrategy: 'Último uso',
  maintenanceMode:
    'Actualmente estamos en mantenimiento, pero no te preocupes, no debería llevar más de unos minutos.',
  membershipRole__admin: 'Administrador',
  membershipRole__basicMember: 'Miembro',
  membershipRole__guestMember: 'Invitado',
  oauthConsent: {
    action__allow: 'Permitir',
    action__deny: 'Denegar',
    offlineAccessNotice:
      ' Seguirás con la sesión iniciada hasta que cierres sesión o revoques el acceso.',
    redirectNotice:
      'Si permites el acceso, esta aplicación te redirigirá a {{domainAction}}.',
    redirectUriModal: {
      subtitle:
        'Asegúrate de confiar en {{applicationName}} y de que esta URL pertenece a {{applicationName}}.',
      title: 'URL de redirección',
    },
    scopeList: {
      privateMetadata:
        'Tus metadatos privados definidos por {{applicationName}}, que pueden incluir información sensible',
      title: 'Esto permitirá a {{applicationName}} acceder a:',
    },
    subtitle:
      'quiere acceder a {{applicationName}} en nombre de {{identifier}}',
    viewFullUrl: 'Ver URL completa',
    warning:
      'Asegúrate de confiar en {{applicationName}} ({{domainAction}}). Puede que estés compartiendo datos sensibles con este sitio o aplicación.',
  },
  oauthDeviceVerification: {
    action__tryAnotherCode: 'Ingresar otro código',
    confirmation: {
      action__approve: 'Aprobar',
      action__deny: 'Denegar',
      scopeListTitle: 'Esto permitirá a {{applicationName}} acceder a:',
      subtitle: 'Confirma esta solicitud para {{identifier}}',
      title: '¿Permitir que {{applicationName}} acceda a tu cuenta?',
      warning:
        'Aprueba esta solicitud solo si la iniciaste en tu otro dispositivo.',
    },
    error: {
      expiredSubtitle: 'Vuelve a empezar en tu dispositivo.',
      expiredTitle: 'Este código expiró',
      genericSubtitle: 'Revisa tu conexión e inténtalo de nuevo.',
      genericTitle: 'No pudimos verificar este código',
      invalidCode: 'Ingresa un código válido de 8 caracteres.',
      rateLimitedSubtitle: 'Espera antes de intentar con otro código.',
      rateLimitedTitle: 'Demasiados intentos',
      unknownCode: 'No encontramos ese código. Revísalo e inténtalo de nuevo.',
    },
    start: {
      action__continue: 'Continuar',
      subtitle:
        'Ingresa el código que aparece en el dispositivo o aplicación que quieres autorizar.',
      title: 'Verificar un dispositivo',
      userCodeLabel: 'Código del dispositivo',
    },
    status: {
      alreadyApprovedSubtitle: 'Vuelve a tu dispositivo para continuar.',
      alreadyApprovedTitle: 'Ya aprobaste esta solicitud',
      alreadyDecidedSubtitle:
        'Se resolvió en otro lugar. Vuelve a tu dispositivo.',
      alreadyDecidedTitle: 'Esta solicitud ya se completó',
      alreadyDeniedSubtitle:
        'Vuelve a empezar en tu dispositivo si quieres intentarlo de nuevo.',
      alreadyDeniedTitle: 'Esta solicitud fue denegada',
      approvedSubtitle:
        'Aprobaste esta solicitud. Vuelve a tu dispositivo para continuar.',
      approvedTitle: 'Dispositivo aprobado',
      consumedSubtitle:
        'Tu dispositivo está autorizado. Puedes cerrar esta ventana.',
      consumedTitle: 'Este código ya fue utilizado',
      deniedSubtitle: 'Denegaste esta solicitud. Vuelve a tu dispositivo.',
      deniedTitle: 'Acceso denegado',
    },
  },
  organizationList: {
    action__createOrganization: 'Crear organización',
    action__invitationAccept: 'Unirse',
    action__suggestionsAccept: 'Solicitar unirse',
    createOrganization: 'Crear Organización',
    invitationAcceptedLabel: 'Unido',
    subtitle: 'para continuar con {{applicationName}}',
    suggestionsAcceptedLabel: 'Aprobación pendiente',
    title: 'Elige una cuenta',
    titleWithoutPersonal: 'Elige una organización',
  },
  organizationProfile: {
    apiKeysPage: {
      title: 'Claves de API',
    },
    badge__automaticInvitation: 'Invitaciones automáticas',
    badge__automaticSuggestion: 'Sugerencias automáticas',
    badge__manualInvitation: 'Sin inscripciones automáticas',
    badge__unverified: 'No verificado',
    billingPage: {
      paymentHistorySection: {
        empty: 'No hay historial de pagos',
        notFound: 'No se encontró el intento de pago',
        tableHeader__amount: 'Monto',
        tableHeader__date: 'Fecha',
        tableHeader__status: 'Estado',
      },
      paymentMethodsSection: {
        actionLabel__default: 'Establecer como predeterminado',
        actionLabel__remove: 'Eliminar',
        add: 'Agregar nuevo método de pago',
        addSubtitle: 'Agrega un nuevo método de pago a tu cuenta.',
        cancelButton: 'Cancelar',
        formButtonPrimary__add: 'Agregar método de pago',
        formButtonPrimary__pay: 'Pagar {{amount}}',
        payWithTestCardButton: 'Pagar con tarjeta de prueba',
        removeMethod: {
          messageLine1: '{{identifier}} será eliminado de esta cuenta.',
          messageLine2:
            'Ya no podrás usar este método de pago y cualquier suscripción que dependa de él dejará de funcionar.',
          successMessage: '{{paymentMethod}} se ha eliminado de tu cuenta.',
          title: 'Eliminar método de pago',
        },
        title: 'Métodos de pago',
      },
      start: {
        headerTitle__payments: 'Pagos',
        headerTitle__plans: 'Planes',
        headerTitle__statements: 'Facturas',
        headerTitle__subscriptions: 'Suscripción',
      },
      statementsSection: {
        empty: 'No hay facturas para mostrar',
        itemCaption__paidForPlan: 'Pagado por el plan {{plan}} {{period}}',
        itemCaption__proratedCredit:
          'Crédito proporcional por el tiempo no utilizado de la suscripción anterior',
        itemCaption__subscribedAndPaidForPlan:
          'Suscrito y pagado por el plan {{plan}} {{period}}',
        notFound: 'Factura no encontrada',
        tableHeader__amount: 'Monto',
        tableHeader__date: 'Fecha',
        title: 'Facturas',
        totalPaid: 'Total pagado',
      },
      subscriptionsListSection: {
        actionLabel__manageSubscription: 'Administrar',
        actionLabel__newSubscription: 'Suscribirse a un plan',
        actionLabel__switchPlan: 'Cambiar de plan',
        tableHeader__edit: 'Editar',
        tableHeader__plan: 'Plan',
        tableHeader__startDate: 'Fecha de inicio',
        title: 'Suscripción',
      },
      subscriptionsSection: {
        actionLabel__default: 'Administrar',
      },
      switchPlansSection: {
        title: 'Cambiar de plan',
      },
      title: 'Facturación',
    },
    createDomainPage: {
      subtitle:
        'Agrega el dominio para verificar. Los usuarios con direcciones de correo electrónico en este dominio pueden unirse a la organización aquí o solicitar unirse.',
      title: 'Agregar dominio',
    },
    invitePage: {
      detailsTitle__inviteFailed:
        'No se pudieron enviar las invitaciones. Solucione lo siguiente y vuelva a intentarlo:',
      formButtonPrimary__continue: 'Enviar invitaciones',
      selectDropdown__role: 'Seleccionar rol',
      subtitle:
        'Ingresa o pega una o más direcciones de correo electrónico, separadas por espacios o comas',
      successMessage: 'Invitaciones enviadas con éxito',
      title: 'Invitar miembros',
    },
    membersPage: {
      action__invite: 'Invitar',
      action__search: 'Buscar',
      activeMembersTab: {
        menuAction__remove: 'Eliminar miembro',
        tableHeader__actions: 'Acciones',
        tableHeader__joined: 'Se unió',
        tableHeader__role: 'Rol',
        tableHeader__user: 'Usuario',
      },
      alerts: {
        roleSetMigrationInProgress: {
          subtitle:
            'Estamos actualizando los roles disponibles. Una vez hecho esto, podrás actualizar los roles de nuevo.',
          title: 'Los roles están temporalmente bloqueados',
        },
      },
      detailsTitle__emptyRow: 'No hay miembros para mostrar',
      invitationsTab: {
        autoInvitations: {
          headerSubtitle:
            'Invita usuarios conectando un correo electrónico del dominio con tu organización. Cualquiera que se registre con un correo electrónico del dominio existente podrá unirse a la organización en cualquier momento.',
          headerTitle: 'Invitaciones automáticas',
          primaryButton: 'Administrar dominios verificados',
        },
        table__emptyRow: 'No hay invitaciones para mostrar',
      },
      invitedMembersTab: {
        menuAction__revoke: 'Revocar invitación',
        tableHeader__invited: 'Invitado',
      },
      requestsTab: {
        autoSuggestions: {
          headerSubtitle:
            'Los usuarios que inicien sesión con un correo electrónico del dominio existente podrán ver una sugerencia para solicitar unirse a tu organización.',
          headerTitle: 'Sugerencias automáticas',
          primaryButton: 'Administrar dominios verificados',
        },
        menuAction__approve: 'Aprobado',
        menuAction__reject: 'Rechazado',
        tableHeader__requested: 'Acceso solicitado',
        table__emptyRow: 'No hay solicitudes para mostrar',
      },
      start: {
        headerTitle__invitations: 'Invitaciones',
        headerTitle__members: 'Miembros',
        headerTitle__requests: 'Solicitudes',
      },
    },
    navbar: {
      apiKeys: 'Claves de API',
      billing: 'Facturación',
      description: 'Administra tu organización.',
      general: 'General',
      members: 'Miembros',
      title: 'Organización',
    },
    plansPage: {
      alerts: {
        noPermissionsToManageBilling:
          'No tienes permisos para administrar la facturación de esta organización.',
      },
      title: 'Planes',
    },
    profilePage: {
      dangerSection: {
        deleteOrganization: {
          actionDescription:
            'Escribe "{{organizationName}}" a continuación para continuar.',
          messageLine1: '¿Estás seguro que quieres eliminar esta organización?',
          messageLine2: 'Esta acción es permanente e irreversible.',
          successMessage: 'Eliminaste la organización.',
          title: 'Eliminar organización',
        },
        leaveOrganization: {
          actionDescription:
            'Escribe "{{organizationName}}" a continuación para continuar.',
          messageLine1:
            '¿Estás seguro de que deseas abandonar esta organización? Perderás el acceso a esta organización y sus aplicaciones.',
          messageLine2: 'Esta acción es permanente e irreversible.',
          successMessage: 'Abandonaste la organización.',
          title: 'Abandonar organización',
        },
        title: 'Peligro',
      },
      domainSection: {
        menuAction__manage: 'Administrar',
        menuAction__remove: 'Eliminar',
        menuAction__verify: 'Verificar',
        primaryButton: 'Agregar dominio',
        subtitle:
          'Permite que los usuarios se unan automáticamente según su dominio de correo verificado.',
        title: 'Dominios verificados',
      },
      successMessage: 'La organización ha sido actualizada.',
      title: 'Perfil de la organización',
    },
    removeDomainPage: {
      messageLine1:
        'Se eliminará el de correo electrónico del dominio {{domain}}.',
      messageLine2:
        'Los usuarios no podrán unirse a la organización de manera automática una vez que se haya eliminado.',
      successMessage: '{{domain}} se ha eliminado.',
      title: 'Eliminar dominio',
    },
    start: {
      headerTitle__general: 'General',
      headerTitle__members: 'Miembros',
      profileSection: {
        primaryButton: 'Actualizar perfil',
        title: 'Perfil de la organización',
        uploadAction__title: 'Logo',
      },
    },
    verifiedDomainPage: {
      dangerTab: {
        calloutInfoLabel:
          'Eliminar este dominio afectará a los usuarios invitados.',
        removeDomainActionLabel__remove: 'Eliminar dominio',
        removeDomainSubtitle:
          'Eliminar este dominio de los dominios verificados',
        removeDomainTitle: 'Eliminar dominio',
      },
      enrollmentTab: {
        automaticInvitationOption__description:
          'Los usuarios son invitados automáticamente a la organización cuando se registran y pueden unirse en cualquier momento.',
        automaticInvitationOption__label: 'Invitaciones automáticas',
        automaticSuggestionOption__description:
          'Los usuarios reciben una sugerencia para solicitar unirse, pero deben ser aprobados por un administrador antes de poder unirse a la organización.',
        automaticSuggestionOption__label: 'Sugerencias automáticas',
        calloutInfoLabel:
          'Cambiar el modo de inscripción solo afectará a los nuevos usuarios.',
        calloutInvitationCountLabel:
          'Invitaciones pendientes enviadas a usuarios: {{count}}',
        calloutSuggestionCountLabel:
          'Sugerencias pendientes enviadas a usuarios: {{count}}',
        manualInvitationOption__description:
          'Los usuarios solo pueden ser invitados manualmente a la organización.',
        manualInvitationOption__label: 'Sin inscripción automática',
        subtitle:
          'Selecciona cómo los usuarios de este dominio pueden unirse a la organización.',
      },
      start: {
        headerTitle__danger: 'Peligro',
        headerTitle__enrollment: 'Opciones de inscripción',
      },
      subtitle:
        'El dominio {{domain}} ahora está verificado. Continúa seleccionando el modo de inscripción.',
      title: 'Actualizar {{domain}}',
    },
    verifyDomainPage: {
      formSubtitle:
        'Introduce el código de verificación enviado a tu dirección de correo electrónico',
      formTitle: 'Código de verificación',
      resendButton: 'No recibiste un código? Reenviar',
      subtitle:
        'El dominio {{domainName}} necesita ser verificado vía correo electrónico.',
      subtitleVerificationCodeScreen:
        'Se envió un código de verificación a {{emailAddress}}. Introduce el código para continuar.',
      title: 'Verificar dominio',
    },
  },
  organizationSwitcher: {
    action__closeOrganizationSwitcher: 'Cerrar selector de organización',
    action__createOrganization: 'Crear Organización',
    action__invitationAccept: 'Unirse',
    action__manageOrganization: 'Administrar Organización',
    action__openOrganizationSwitcher: 'Abrir selector de organización',
    action__suggestionsAccept: 'Solicitar unirse',
    notSelected: 'Ninguna organización seleccionada',
    personalWorkspace: 'Espacio personal',
    suggestionsAcceptedLabel: 'Pendiente de aprobación',
  },
  paginationButton__next: 'Siguiente',
  paginationButton__previous: 'Anterior',
  paginationRowText__displaying: 'Mostrando',
  paginationRowText__of: 'de',
  reverification: {
    alternativeMethods: {
      actionLink: 'Solicitar ayuda',
      actionText: '¿No posees ninguno de estos?',
      blockButton__backupCode: 'Utiliza un código de respaldo',
      blockButton__emailCode: 'Envía el código a {{identifier}}',
      blockButton__passkey: 'Utiliza tu llave de acceso',
      blockButton__password: 'Continúa con tu contraseña',
      blockButton__phoneCode: 'Enviar un mensaje de texto a {{identifier}}',
      blockButton__totp: 'aplicación de autenticación',
      getHelp: {
        blockButton__emailSupport: 'Soporte por correo electrónico',
        content: 'Si tienes problemas para iniciar sesión',
        title: 'Obtener ayuda',
      },
      subtitle:
        '¿Tienes problemas? Puedes utilizar cualquiera de estos métodos para iniciar sesión',
      title: 'Utiliza otro método',
    },
    backupCodeMfa: {
      subtitle:
        'Tu código de respaldo es el que obtuviste cuando configuraste la autenticación en dos pasos',
      title: 'Ingresa tu código de respaldo',
    },
    emailCode: {
      formTitle: 'Código de verificación',
      resendButton: '¿No recibiste un código? Reenviar',
      subtitle: 'para continuar con {{applicationName}}',
      title: 'Revisa tu correo electrónico',
    },
    noAvailableMethods: {
      message:
        'No se puede proceder con el inicio de sesión. No hay ningún factor de autenticación disponible',
      subtitle: 'Ocurrió un error',
      title: 'No se puede iniciar sesión',
    },
    passkey: {
      blockButton__passkey: 'Utiliza tu llave de acceso',
      subtitle:
        'Utilizar tu llave de acceso confirma que eres tú. Tu dispositivo puede solicitar tu huella dactilar, rostro o pantalla de bloqueo.',
      title: 'Utiliza tu llave de acceso',
    },
    password: {
      actionLink: 'Utiliza otro método',
      subtitle: 'Ingresa tu contraseña actual para continuar',
      title: 'Verificación requerida',
    },
    phoneCode: {
      formTitle: 'Código de verificación',
      resendButton: '¿No recibiste un código? Reenviar',
      subtitle: 'Ingresa el código enviado a tu celular para continuar',
      title: 'Verificación requerida',
    },
    phoneCodeMfa: {
      formTitle: 'Código de verificación',
      resendButton: '¿No recibiste un código? Reenviar',
      subtitle: 'Ingresa el código enviado a tu celular para continuar',
      title: 'Verificación requerida',
    },
    totpMfa: {
      formTitle: 'Código de verificación',
      subtitle:
        'Ingresa el código generado por la aplicación de autenticación para continuar',
      title: 'Verificación requerida',
    },
  },
  signIn: {
    accountSwitcher: {
      action__addAccount: 'Agregar cuenta',
      action__signOutAll: 'Cerrar sesión de todas las cuentas',
      subtitle: 'Selecciona la cuenta con la que deseas continuar.',
      title: 'Elige una cuenta',
    },
    alternativeMethods: {
      actionLink: 'Obtener ayuda',
      actionText: '¿No tienes ninguno de estos?',
      blockButton__backupCode: 'Usa un código de respaldo',
      blockButton__emailCode: 'Enviar código a {{identifier}}',
      blockButton__emailLink: 'Enviar enlace a {{identifier}}',
      blockButton__passkey: 'Inicia sesión con tu llave de acceso',
      blockButton__password: 'Inicia sesión con tu contraseña',
      blockButton__phoneCode: 'Enviar código a {{identifier}}',
      blockButton__totp: 'Usa tu aplicación de autenticación',
      getHelp: {
        blockButton__emailSupport: 'Soporte de correo electrónico',
        content:
          'Si tienes problemas para ingresar a tu cuenta, envíenos un correo electrónico y trabajaremos contigo para restablecer el acceso lo antes posible.',
        title: 'Obtener ayuda',
      },
      subtitle:
        'Si estás experimentando problemas, puedes utilizar uno de estos métodos para ingresar.',
      title: 'Utiliza otro método',
    },
    alternativePhoneCodeProvider: {
      formTitle: 'Código de verificación',
      resendButton: '¿No recibiste un código? Reenviar',
      subtitle: 'para continuar con {{applicationName}}',
      title: 'Revisa tu {{provider}}',
    },
    backupCodeMfa: {
      subtitle: 'para continuar a {{applicationName}}',
      title: 'Introduce un código de seguridad',
    },
    emailCode: {
      formTitle: 'Código de verificación',
      resendButton: 'Re-enviar código',
      subtitle: 'para continuar a {{applicationName}}',
      title: 'Revisa tu correo electrónico',
    },
    emailCodeMfa: {
      formTitle: 'Revisa tu correo electrónico',
      resendButton: '¿No recibiste un código? Reenviar',
      subtitle: 'para continuar a {{applicationName}}',
      title: 'Revisa tu correo electrónico',
    },
    emailLink: {
      clientMismatch: {
        subtitle:
          'Para continuar, abre el enlace de verificación en tu dispositivo o navegador donde intentaste iniciar sesión',
        title: 'El enlace de verificación es inválido para este dispositivo',
      },
      expired: {
        subtitle: 'Regresa a la pestaña original para continuar.',
        title: 'El enlace de verificación ha expirado',
      },
      failed: {
        subtitle: 'Regresa a la pestaña original para continuar.',
        title: 'El enlace de verificación es inválido',
      },
      formSubtitle:
        'Utiliza el enlace de verificación enviado a tu correo electrónico',
      formTitle: 'Enlace de verificación',
      loading: {
        subtitle: 'Serás redireccionado pronto',
        title: 'Iniciando sesión...',
      },
      resendButton: '¿No recibiste un enlace? Reenviar',
      subtitle: 'para continuar con {{applicationName}}',
      title: 'Revisa tu correo electrónico',
      unusedTab: {
        title: 'Puedes cerrar esta pestaña',
      },
      verified: {
        subtitle: 'Serás redireccionado pronto',
        title: 'Sesión iniciada correctamente',
      },
      verifiedSwitchTab: {
        subtitle: 'Regresa a la pestaña original para continuar',
        subtitleNewTab: 'Regresa a la pestaña recién abierta para continuar',
        titleNewTab: 'Sesión iniciada en otra pestaña',
      },
    },
    emailLinkMfa: {
      formSubtitle:
        'Utiliza el enlace de verificación enviado a tu correo electrónico',
      resendButton: '¿No recibiste el enlace? Reenviar',
      subtitle: 'para continuar a {{applicationName}}',
      title: 'Revisa tu correo electrónico',
    },
    enterpriseConnections: {
      subtitle: 'Selecciona la cuenta empresarial con la que deseas continuar.',
      title: 'Elige tu cuenta empresarial',
    },
    forgotPassword: {
      formTitle: 'Código para restablecer contraseña',
      resendButton: '¿No recibiste un código? Reenviar',
      subtitle: 'para restablecer tu contraseña',
      subtitle_email:
        'Primero, ingresa el código enviado a tu correo electrónico',
      subtitle_phone: 'Primero, ingresa el código enviado a tu celular',
      title: 'Restablecer contraseña',
    },
    forgotPasswordAlternativeMethods: {
      blockButton__resetPassword: 'Restablece tu contraseña',
      label__alternativeMethods: 'O, inicia sesión con otro método',
      title: '¿Olvidaste la contraseña?',
    },
    newDeviceVerificationNotice:
      'Estás iniciando sesión desde un dispositivo nuevo. Estamos pidiendo verificación para mantener tu cuenta segura.',
    noAvailableMethods: {
      message:
        'No se puede continuar con el inicio de sesión. No hay ningún factor de autenticación disponible.',
      subtitle: 'Ocurrió un error',
      title: 'No puedo iniciar sesión',
    },
    passkey: {
      subtitle:
        'Usando tu llave de acceso confirmas que eres tú. Tu dispositivo puede pedirte la huella dactilar, el rostro o el bloqueo de pantalla.',
      title: 'Usa tu llave de acceso',
    },
    password: {
      actionLink: 'Utiliza otro método',
      subtitle: 'para continuar con {{applicationName}}',
      title: 'Ingresa tu contraseña',
    },
    passwordCompromised: {
      title: 'Contraseña comprometida',
    },
    passwordPwned: {
      title: 'Contraseña en peligro',
    },
    passwordUntrusted: {
      title: 'Contraseña no confiable',
    },
    phoneCode: {
      formTitle: 'Código de verificación',
      resendButton: 'Reenviar código',
      subtitle: 'para continuar con {{applicationName}}',
      title: 'Revisa tu celular',
    },
    phoneCodeMfa: {
      formTitle: 'Código de verificación',
      resendButton: 'Reenviar código',
      subtitle: 'para continuar con {{applicationName}}',
      title: 'Revisa tu celular',
    },
    resetPassword: {
      formButtonPrimary: 'Restablecer contraseña',
      requiredMessage:
        'Por razones de seguridad, es necesario restablecer tu contraseña.',
      successMessage:
        'Tu contraseña se ha cambiado correctamente. Te estamos redirigiendo, por favor espera un momento.',
      title: 'Establecer nueva contraseña',
    },
    resetPasswordMfa: {
      detailsLabel:
        'Es necesario verificar tu identidad para restablecer tu contraseña.',
    },
    start: {
      actionLink: 'Crear cuenta',
      actionLink__join_waitlist: 'Unirse a la lista de espera',
      actionLink__use_email: 'Utilizar correo electrónico',
      actionLink__use_email_username:
        'Utilizar correo electrónico o nombre de usuario',
      actionLink__use_passkey: 'Utilizar llave de acceso',
      actionLink__use_phone: 'Utilizar número de celular',
      actionLink__use_username: 'Utilizar nombre de usuario',
      actionText: '¿No tienes una cuenta?',
      actionText__join_waitlist: '¿Quieres acceso anticipado?',
      alternativePhoneCodeProvider: {
        actionLink: 'Usar otro método',
        label: 'Número de celular de {{provider}}',
        subtitle:
          'Ingresa tu número de celular para obtener un código de verificación en {{provider}}.',
        title: 'Iniciar sesión en {{applicationName}} con {{provider}}',
      },
      subtitle: '¡Bienvenido de vuelta! Inicia sesión para continuar',
      subtitleCombined: undefined,
      title: 'Iniciar sesión en {{applicationName}}',
      titleCombined: 'Continuar a {{applicationName}}',
    },
    totpMfa: {
      formTitle: 'Código de verificación',
      subtitle:
        'Para continuar, por favor introduce el código generado por tu aplicación de autenticación',
      title: 'Verificación de dos pasos',
    },
    web3Solana: {
      subtitle: 'Selecciona una billetera abajo para iniciar sesión',
      title: 'Iniciar sesión con Solana',
    },
  },
  signInEnterPasswordTitle: 'Ingresa tu contraseña',
  signUp: {
    alternativePhoneCodeProvider: {
      resendButton: '¿No recibiste un código? Reenviar',
      subtitle: 'Ingresa el código de verificación enviado a tu {{provider}}',
      title: 'Verifica tu {{provider}}',
    },
    continue: {
      actionLink: 'Entrar',
      actionText: '¿Tienes una cuenta?',
      subtitle: 'Por favor completa los datos para continuar',
      title: 'Completa los datos faltantes',
    },
    emailCode: {
      formSubtitle:
        'Ingresa el código de verificación enviado a tu correo electrónico',
      formTitle: 'Código de verificación',
      resendButton: 'Reenviar código',
      subtitle:
        'Ingresa el código de verificación enviado a tu correo electrónico',
      title: 'Verifica tu correo electrónico',
    },
    emailLink: {
      clientMismatch: {
        subtitle:
          'Para continuar, abre el enlace de verificación en el dispositivo o navegador desde el que estás intentando registrarte',
        title: 'El enlace de verificación es inválido para este dispositivo',
      },
      formSubtitle:
        'Utiliza el enlace de verificación enviado a tu dirección de correo electrónico',
      formTitle: 'Enlace de verificación',
      loading: {
        title: 'Registrando...',
      },
      resendButton: '¿No recibiste el enlace? Reenviar',
      subtitle: 'para continuar a {{applicationName}}',
      title: 'Verifica tu correo electrónico',
      verified: {
        title: 'Registrado con éxito',
      },
      verifiedSwitchTab: {
        subtitle: 'Regresa a la pestaña recién abierta para continuar',
        subtitleNewTab: 'Regresa a la pestaña anterior para continuar',
        title: 'Correo electrónico verificado con éxito',
      },
    },
    enterpriseConnections: {
      subtitle:
        'Selecciona la cuenta empresarial con la que deseas registrarte.',
      title: 'Elige tu cuenta empresarial',
    },
    legalConsent: {
      checkbox: {
        label__onlyPrivacyPolicy:
          'He leído y acepto la {{ privacyPolicyLink || link("Política de Privacidad") }}',
        label__onlyTermsOfService:
          'He leído y acepto los {{ termsOfServiceLink || link("Términos y Condiciones") }}',
        label__termsOfServiceAndPrivacyPolicy:
          'He leído y acepto los {{ termsOfServiceLink || link("Términos y Condiciones") }} y la {{ privacyPolicyLink || link("Política de Privacidad") }}',
      },
      continue: {
        subtitle: 'Al continuar, aceptas las condiciones mencionadas.',
        title: 'Por favor, acepta nuestros términos y políticas para continuar',
      },
    },
    phoneCode: {
      formSubtitle:
        'Ingresa el código de verificación enviado a tu número de celular.',
      formTitle: 'Código de verificación',
      resendButton: 'Reenviar código',
      subtitle: 'para continuar a {{applicationName}}',
      title: 'Verifica tu celular',
    },
    restrictedAccess: {
      actionLink: 'Iniciar sesión',
      actionText: '¿Tienes cuenta?',
      blockButton__emailSupport: 'Soporte por correo electrónico',
      blockButton__joinWaitlist: 'Unirse a la lista de espera',
      subtitle:
        'Los registros están desactivados actualmente. Si crees que tienes acceso, contacta soporte',
      subtitleWaitlist:
        'Los registros están desactivados actualmente. Para ser el primero en saber cuando estemos listos, únete a la lista de espera',
      title: 'Acceso restringido',
    },
    start: {
      actionLink: 'Inicia sesión',
      actionLink__use_email: 'Utilizar el correo electrónico',
      actionLink__use_phone: 'Utilizar el número de celular',
      actionText: '¿Ya tienes una cuenta?',
      alternativePhoneCodeProvider: {
        actionLink: 'Usar otro método',
        label: 'Número de celular de {{provider}}',
        subtitle:
          'Ingresa tu número de celular para obtener un código de verificación en {{provider}}.',
        title: 'Regístrate en {{applicationName}} con {{provider}}',
      },
      subtitle: '¡Bienvenido! Completa tus datos para comenzar',
      subtitleCombined: '¡Bienvenido! Completa tus datos para comenzar',
      title: 'Crea tu cuenta',
      titleCombined: 'Crea tu cuenta',
    },
    web3Solana: {
      subtitle: 'Selecciona una billetera abajo para registrarte',
      title: 'Registrarse con Solana',
    },
  },
  socialButtonsBlockButton: 'Continuar con {{provider|titleize}}',
  socialButtonsBlockButtonManyInView: '{{provider|titleize}}',
  taskChooseOrganization: {
    alerts: {
      organizationAlreadyExists:
        'Ya existe una organización para el nombre de empresa detectado ({{organizationName}}) y {{organizationDomain}}. Únete por invitación.',
    },
    chooseOrganization: {
      action__createOrganization: 'Crear nueva organización',
      action__invitationAccept: 'Unirse',
      action__suggestionsAccept: 'Solicitar unirse',
      subtitle: 'Unirse a una organización existente o crear una nueva',
      subtitle__createOrganizationDisabled:
        'Unirse a una organización existente',
      suggestionsAcceptedLabel: 'Pendiente de aprobación',
      title: 'Elegir una organización',
    },
    createOrganization: {
      formButtonReset: 'Cancelar',
      formButtonSubmit: 'Continuar',
      formFieldInputPlaceholder__name: 'Mi Organización',
      formFieldInputPlaceholder__slug: 'mi-organizacion',
      formFieldLabel__name: 'Nombre',
      formFieldLabel__slug: 'Identificador',
      subtitle: 'Ingresa los detalles de tu organización para continuar',
      title: 'Configurar tu organización',
    },
    organizationCreationDisabled: {
      subtitle:
        'Contacta al administrador de tu organización para obtener una invitación.',
      title: 'Debe pertenecer a una organización',
    },
    signOut: {
      actionLink: 'Cerrar sesión',
      actionText: 'Conectado como {{identifier}}',
    },
  },
  taskResetPassword: {
    formButtonPrimary: 'Restablecer contraseña',
    signOut: {
      actionLink: 'Cerrar sesión',
      actionText: 'Conectado como {{identifier}}',
    },
    subtitle: 'Tu cuenta requiere una nueva contraseña antes de continuar',
    title: 'Restablece tu contraseña',
  },
  taskSetupMfa: {
    badge: 'Configuración de verificación en dos pasos',
    signOut: {
      actionLink: 'Cerrar sesión',
      actionText: 'Conectado como {{identifier}}',
    },
    smsCode: {
      addPhone: {
        formButtonPrimary: 'Continuar',
        infoText:
          'Se enviará un mensaje de texto con un código de verificación a este número. Pueden aplicar tarifas de mensajes y datos.',
      },
      addPhoneNumber: 'Agregar número de celular',
      cancel: 'Cancelar',
      subtitle:
        'Elige el número de celular que deseas usar para la verificación en dos pasos por SMS',
      success: {
        finishButton: 'Continuar',
        message1:
          'La verificación en dos pasos está habilitada. Al iniciar sesión, deberás ingresar un código de verificación enviado a este número como paso adicional.',
        message2:
          'Guarda estos códigos de respaldo en un lugar seguro. Si pierdes acceso a tu dispositivo de autenticación, puedes usarlos para iniciar sesión.',
        title: 'Verificación por código SMS habilitada',
      },
      title: 'Agregar verificación por código SMS',
      verifyPhone: {
        formButtonPrimary: 'Continuar',
        formTitle: 'Código de verificación',
        resendButton: '¿No recibiste un código? Reenviar',
        subtitle: 'Ingresa el código de verificación enviado a',
        title: 'Verifica tu número de celular',
      },
    },
    start: {
      methodSelection: {
        phoneCode: 'Código SMS',
        totp: 'Aplicación de autenticación',
      },
      subtitle:
        'Elige el método que prefieras para proteger tu cuenta con una capa adicional de seguridad',
      title: 'Configurar verificación en dos pasos',
    },
    totpCode: {
      addAuthenticatorApp: {
        buttonAbleToScan__nonPrimary: 'Escanear código QR en su lugar',
        buttonUnableToScan__nonPrimary: '¿No puedes escanear el código QR?',
        formButtonPrimary: 'Continuar',
        formButtonReset: 'Cancelar',
        infoText__ableToScan:
          'Configura un nuevo método de inicio de sesión en tu aplicación de autenticación y escanea el siguiente código QR para vincularlo a tu cuenta.',
        infoText__unableToScan:
          'Configura un nuevo método de inicio de sesión en tu autenticador e ingresa la clave proporcionada a continuación.',
        inputLabel__unableToScan1:
          'Asegúrate de que las contraseñas de un solo uso o por tiempo estén habilitadas, luego finaliza la vinculación de tu cuenta.',
      },
      success: {
        finishButton: 'Continuar',
        message1:
          'La verificación en dos pasos está habilitada. Al iniciar sesión, deberás ingresar un código de verificación de este autenticador como paso adicional.',
        message2:
          'Guarda estos códigos de respaldo en un lugar seguro. Si pierdes acceso a tu dispositivo de autenticación, puedes usarlos para iniciar sesión.',
        title: 'Verificación por aplicación de autenticación habilitada',
      },
      title: 'Agregar aplicación de autenticación',
      verifyTotp: {
        formButtonPrimary: 'Continuar',
        formButtonReset: 'Cancelar',
        formTitle: 'Código de verificación',
        subtitle:
          'Ingresa el código de verificación generado por tu autenticador',
        title: 'Agregar aplicación de autenticación',
      },
    },
  },
  unstable__errors: {
    already_a_member_in_organization:
      '{{email}} ya es miembro de la organización.',
    avatar_file_size_exceeded:
      'El tamaño del archivo supera el límite máximo de 10 MB. Por favor, elige un archivo más pequeño.',
    avatar_file_type_invalid:
      'Formato no soportado. Por favor, sube una imagen JPG, PNG, GIF o WEBP.',
    captcha_invalid:
      'El registro falló debido a fallos en la validación de seguridad. Por favor, recarga la página o contáctanos para obtener más asistencia.',
    captcha_unavailable:
      'El registro falló debido a fallos en la validación de robot. Por favor, recarga la página o contáctanos para obtener más asistencia.',
    form_code_incorrect: 'Código incorrecto.',
    form_email_address_blocked:
      'Los servicios de correo electrónico temporal no están soportados. Por favor, usa tu dirección de correo electrónico regular para crear una cuenta.',
    form_identifier_exists__email_address: 'El correo electrónico ya existe',
    form_identifier_exists__phone_number: 'El número telefónico ya existe.',
    form_identifier_exists__username: 'El nombre de usuario ya existe.',
    form_identifier_not_found:
      'No encontramos tu cuenta. Por favor, intenta de nuevo.',
    form_new_password_matches_current:
      'La nueva contraseña no puede ser igual a la contraseña actual.',
    form_param_format_invalid: 'Formato inválido.',
    form_param_format_invalid__email_address:
      'El correo electrónico debe ser válido.',
    form_param_format_invalid__phone_number:
      'El número telefónico debe ser en un formato válido internacional.',
    form_param_max_length_exceeded__first_name:
      'El nombre debe tener menos de 256 caracteres.',
    form_param_max_length_exceeded__last_name:
      'El apellido debe tener menos de 256 caracteres.',
    form_param_max_length_exceeded__name:
      'El nombre debe tener menos de 256 caracteres.',
    form_param_nil: 'Este campo es obligatorio.',
    form_param_type_invalid: 'Tipo de parámetro inválido.',
    form_param_type_invalid__email_address:
      'El correo electrónico ingresado no es válido.',
    form_param_type_invalid__phone_number:
      'El número de celular ingresado no es válido.',
    form_param_value_invalid: 'Valor inválido',
    form_password_compromised__sign_in:
      'Tu contraseña puede estar comprometida. Para proteger tu cuenta, continúa con otro método de inicio de sesión.',
    form_password_incorrect: 'Contraseña incorrecta.',
    form_password_length_too_short:
      'La contraseña es muy corta. Debe tener al menos 8 caracteres.',
    form_password_not_strong_enough:
      'La contraseña no es suficientemente segura.',
    form_password_or_identifier_incorrect:
      'La contraseña o la dirección de correo electrónico es incorrecta. Inténtalo de nuevo o usa otro método.',
    form_password_pwned:
      'Esta contraseña fue expuesta en una brecha de seguridad y no se puede usar. Por favor, intenta con otra contraseña.',
    form_password_pwned__sign_in:
      'Esta contraseña fue expuesta en una brecha de seguridad y no se puede usar. Por favor, restablece tu contraseña.',
    form_password_size_in_bytes_exceeded:
      'La contraseña excede el número máximo de bytes permitidos. Por favor, elimina algunos caracteres especiales o reduce la longitud de la contraseña.',
    form_password_untrusted__sign_in:
      'Tu contraseña puede estar comprometida. Para proteger tu cuenta, continúa con un método alternativo de inicio de sesión. Deberás restablecer tu contraseña después de iniciar sesión.',
    form_password_validation_failed: 'Contraseña incorrecta',
    form_username_invalid_character:
      'El nombre de usuario contiene caracteres inválidos.',
    form_username_invalid_length:
      'La longitud del nombre de usuario es demasiado corta.',
    form_username_needs_non_number_char:
      'Tu nombre de usuario debe contener al menos un carácter no numérico.',
    identification_deletion_failed:
      'No se puede eliminar la última identificación.',
    not_allowed_access: 'No tienes permiso para acceder a esta página.',
    organization_domain_blocked:
      'Este correo electrónico del dominio está bloqueado, intenta con otro.',
    organization_domain_common:
      'Este correo electrónico del dominio es muy común, intenta con otro.',
    organization_domain_exists_for_enterprise_connection:
      'Este dominio ya esta en uso para tú organización',
    organization_membership_quota_exceeded:
      'Alcanzaste el limite de miembros en la organización, incluyendo las invitaciones enviadas.',
    organization_minimum_permissions_needed:
      'Debe existir al menos un miembro en la organización.',
    organization_not_found_or_unauthorized:
      'Ya no eres miembro de esta organización. Por favor elige o crea otra.',
    organization_not_found_or_unauthorized_with_create_organization_disabled:
      'Ya no eres miembro de esta organización. Por favor elige otra.',
    passkey_already_exists:
      'Ya se ha registrado una llave de acceso en este dispositivo.',
    passkey_not_supported:
      'Las llaves de acceso no son compatibles con este dispositivo.',
    passkey_pa_not_supported:
      'El registro requiere un autenticador de plataforma, pero el dispositivo no es compatible.',
    passkey_registration_cancelled:
      'El registro de la llave de acceso se ha cancelado o ha expirado.',
    passkey_retrieval_cancelled:
      'La verificación de la llave de acceso se ha cancelado o ha expirado.',
    passwordComplexity: {
      maximumLength: 'menos de {{length}} caracteres',
      minimumLength: '{{length}} o más caracteres',
      requireLowercase: 'al menos una letra minúscula',
      requireNumbers: 'al menos un número',
      requireSpecialCharacter: 'al menos un carácter especial',
      requireUppercase: 'al menos una letra mayúscula',
      sentencePrefix: 'Tu contraseña debe contener',
    },
    phone_number_exists: 'Este número de telefónico ya está en uso.',
    session_exists: 'Ya iniciaste sesión',
    web3_missing_identifier:
      'No se puede encontrar la extension de la billetera Web3. Instala una para continuar',
    web3_signature_request_rejected:
      'Has rechazado la solicitud de firma. Inténtalo de nuevo para continuar.',
    web3_solana_signature_generation_failed:
      'Se produjo un error al generar la firma. Inténtalo de nuevo para continuar.',
    zxcvbn: {
      couldBeStronger:
        'Tu contraseña funciona, pero puede ser más segura. Prueba agregando más caracteres.',
      goodPassword: 'Tu contraseña cumple con todos los requisitos necesarios.',
      notEnough: 'Tu contraseña no es lo suficientemente segura.',
      suggestions: {
        allUppercase: 'Escribe algunas letras en mayúsculas, pero no todas.',
        anotherWord: 'Agrega palabras menos comunes.',
        associatedYears: 'Evita años asociados contigo.',
        capitalization:
          'Escribe algunas letras en mayúsculas además de la primera.',
        dates: 'Evita fechas asociadas contigo.',
        l33t: "Evita sustituciones predecibles como '@' por 'a'",
        longerKeyboardPattern:
          'Usa patrones de teclado más largos y cambia la dirección de escritura varias veces.',
        noNeed:
          'Puedes crear contraseñas seguras sin usar símbolos, números o mayúsculas.',
        pwned: 'Si utilizas esta contraseña en otro lugar, deberías cambiarla.',
        recentYears: 'Evita años recientes.',
        repeated: 'Evita palabras y letras repetidas.',
        reverseWords: 'Evita palabras comunes escritas al revés',
        sequences: 'Evita secuencias de letras comunes.',
        useWords: 'Utiliza varias palabras, pero evita frases comunes.',
      },
      warnings: {
        common: 'Es una contraseña utilizada comúnmente.',
        commonNames: 'Nombres y apellidos comunes son fáciles de adivinar.',
        dates: 'Las fechas son fáciles de adivinar.',
        extendedRepeat:
          'Patrones repetidos como "abcabcabc" son fáciles de adivinar.',
        keyPattern: 'Patrones cortos son fáciles de adivinar.',
        namesByThemselves: 'Nombres y apellidos son fáciles de adivinar.',
        pwned:
          'Tu contraseña fue expuesta por una violación de datos en Internet.',
        recentYears: 'Los años recientes son fáciles de adivinar.',
        sequences: 'Patrones comunes como "abc" son fáciles de adivinar',
        similarToCommon: 'Es similar a una contraseña utilizada habitualmente.',
        simpleRepeat: 'Caracteres repetidos como "aaa" son fáciles de adivinar',
        straightRow:
          'Teclas consecutivas en tu teclado son fáciles de adivinar.',
        topHundred: 'Es una contraseña utilizada con mucha frecuencia.',
        topTen: 'Es de las contraseñas más utilizadas.',
        userInputs:
          'No debería haber datos personales o relacionados con esta página.',
        wordByItself: 'Palabras únicas son fáciles de adivinar.',
      },
    },
  },
  userButton: {
    action__addAccount: 'Agregar cuenta',
    action__closeUserMenu: 'Cerrar menú de usuario',
    action__manageAccount: 'Administrar cuenta',
    action__openUserMenu: 'Abrir menú de usuario',
    action__signOut: 'Cerrar sesión',
    action__signOutAll: 'Salir de todas las cuentas',
  },
  userProfile: {
    apiKeysPage: {
      title: 'Claves de API',
    },
    backupCodePage: {
      actionLabel__copied: 'Copiado!',
      actionLabel__copy: 'Copiar todo',
      actionLabel__download: 'Descargar .txt',
      actionLabel__print: 'Imprimir',
      infoText1: 'Se habilitarán códigos de respaldo para esta cuenta.',
      infoText2:
        'Mantén los códigos de respaldo en secreto y guárdalos de forma segura. Puedes regenerar códigos de respaldo si sospechas que se han visto comprometidos.',
      subtitle__codelist: 'Guárdalos de forma segura y mantenlos en secreto.',
      successMessage:
        'Los códigos de respaldo ahora están habilitados. Puedes utilizar uno de estos para iniciar sesión en tu cuenta, si pierdes el acceso a tu dispositivo de autenticación. Cada código solo se puede utilizar una vez.',
      successSubtitle:
        'Puedes utilizar uno de estos para iniciar sesión en tu cuenta, si pierdes el acceso a tu dispositivo de autenticación.',
      title: 'Agregar verificación de código de respaldo',
      title__codelist: 'Códigos de respaldo',
    },
    billingPage: {
      paymentHistorySection: {
        empty: 'No hay historial de pagos',
        notFound: 'No se encontró el intento de pago',
        tableHeader__amount: 'Monto',
        tableHeader__date: 'Fecha',
        tableHeader__status: 'Estado',
      },
      paymentMethodsSection: {
        actionLabel__default: 'Elegir como predeterminado',
        actionLabel__remove: 'Eliminar',
        add: 'Agregar método de pago',
        addSubtitle: 'Agrega un nuevo método de pago a tu cuenta.',
        cancelButton: 'Cancelar',
        formButtonPrimary__add: 'Agregar Método de Pago',
        formButtonPrimary__pay: 'Pagar {{amount}}',
        payWithTestCardButton: 'Pagar con tarjeta de prueba',
        removeMethod: {
          messageLine1: '{{identifier}} será eliminado de tu cuenta.',
          messageLine2:
            'Ya no podrás usar este método de pago y las suscripciones que dependan de él podrían dejar de funcionar.',
          successMessage: 'Se ha eliminado {{paymentMethod}} de tu cuenta.',
          title: 'Eliminar método de pago',
        },
        title: 'Métodos de pago',
      },
      start: {
        headerTitle__payments: 'Pagos',
        headerTitle__plans: 'Planes',
        headerTitle__statements: 'Facturas',
        headerTitle__subscriptions: 'Suscripciones',
      },
      statementsSection: {
        empty: 'No hay facturas para mostrar',
        itemCaption__paidForPlan: 'Pagado por el plan {{plan}} {{period}}',
        itemCaption__proratedCredit:
          'Crédito proporcional por el tiempo no utilizado de la suscripción anterior',
        itemCaption__subscribedAndPaidForPlan:
          'Suscrito y pagado por el plan {{plan}} {{period}}',
        notFound: 'Factura no encontrada',
        tableHeader__amount: 'Monto',
        tableHeader__date: 'Fecha',
        title: 'Facturas',
        totalPaid: 'Total pagado',
      },
      subscriptionsListSection: {
        actionLabel__manageSubscription: 'Administrar',
        actionLabel__newSubscription: 'Suscribirse a un plan',
        actionLabel__switchPlan: 'Cambiar de plan',
        tableHeader__edit: 'Editar',
        tableHeader__plan: 'Plan',
        tableHeader__startDate: 'Fecha de inicio',
        title: 'Suscripción',
      },
      subscriptionsSection: {
        actionLabel__default: 'Administrar',
      },
      switchPlansSection: {
        title: 'Cambiar de plan',
      },
      title: 'Facturación y Pagos',
    },
    connectedAccountPage: {
      formHint: 'Selecciona un proveedor para conectar su cuenta.',
      formHint__noAccounts:
        'No hay proveedores de cuentas externas disponibles.',
      removeResource: {
        messageLine1: '{{identifier}} será eliminado de esta cuenta.',
        messageLine2:
          'Ya no podrás utilizar esta cuenta activa y las funciones dependientes ya no funcionarán.',
        successMessage: '{{connectedAccount}} ha sido eliminado de tu cuenta.',
        title: 'Eliminar cuenta conectada',
      },
      socialButtonsBlockButton: '{{provider|titleize}}',
      successMessage: 'El proveedor ha sido agregado a tu cuenta',
      title: 'Agregar cuenta conectada',
    },
    deletePage: {
      actionDescription:
        'Escribe "Eliminar cuenta" a continuación para continuar',
      confirm: 'Eliminar cuenta',
      messageLine1:
        '¿Estás seguro de que deseas eliminar tu cuenta? Es posible que se conserven algunos datos asociados. Para solicitar la eliminación completa de datos, ponte en contacto con el soporte.',
      messageLine2: 'Esta acción es permanente e irreversible.',
      title: 'Eliminar cuenta',
    },
    emailAddressPage: {
      emailCode: {
        formHint:
          'A esta dirección de correo electrónico se le enviará un correo electrónico con un código de verificación.',
        formSubtitle:
          'Introduce el código de verificación enviado a {{identifier}}',
        formTitle: 'Código de verificación',
        resendButton: 'Reenviar código',
        successMessage:
          'El correo electrónico {{identifier}} se ha agregado a tu cuenta.',
      },
      emailLink: {
        formHint:
          'Se enviará un correo electrónico con un enlace de verificación a esta dirección de correo electrónico.',
        formSubtitle:
          'Haz clic en el enlace de verificación en el correo electrónico enviado a {{identifier}}',
        formTitle: 'Enlace de verificación',
        resendButton: 'Reenviar enlace',
        successMessage:
          'El correo electrónico {{identifier}} se ha agregado a su cuenta.',
      },
      enterpriseSSOLink: {
        formButton: 'Haz clic para iniciar sesión',
        formSubtitle: 'Completar el inicio de sesión con {{identifier}}',
      },
      formHint:
        'Deberás verificar el correo electrónico antes de ser agregado a tu cuenta',
      removeResource: {
        messageLine1: '{{identifier}} será eliminado de esta cuenta.',
        messageLine2:
          'Ya no podrás iniciar sesión con esta dirección de correo electrónico.',
        successMessage: '{{emailAddress}} ha sido eliminado de tu cuenta.',
        title: 'Eliminar dirección de correo electrónico',
      },
      title: 'Agregar dirección de correo electrónico',
      verifyTitle: 'Verificar dirección de correo electrónico',
    },
    formButtonPrimary__add: 'Agregar',
    formButtonPrimary__continue: 'Continuar',
    formButtonPrimary__finish: 'Terminar',
    formButtonPrimary__remove: 'Eliminar',
    formButtonPrimary__save: 'Guardar',
    formButtonReset: 'Cancelar',
    mfaPage: {
      formHint: 'Selecciona un método para agregar.',
      title: 'Agregar verificación en dos pasos',
    },
    mfaPhoneCodePage: {
      backButton: 'Usar número existente',
      primaryButton__addPhoneNumber: 'Agregar número de celular',
      removeResource: {
        messageLine1:
          '{{identifier}} dejará de recibir códigos de verificación al iniciar sesión.',
        messageLine2:
          'Es posible que tu cuenta no sea tan segura. ¿Estás seguro de que quieres continuar?',
        successMessage:
          'Se eliminó la verificación de dos pasos por SMS para {{mfaPhoneCode}}',
        title: 'Eliminar la verificación en dos pasos',
      },
      subtitle__availablePhoneNumbers:
        'Selecciona un número de celular para registrar la verificación en dos pasos por SMS.',
      subtitle__unavailablePhoneNumbers:
        'No hay números de celular disponibles para registrar la verificación en dos pasos por SMS.',
      successMessage1:
        'Al iniciar sesión, se te solicitará un código de verificación enviado a este número de celular como un paso adicional.',
      successMessage2:
        'Guarda estos códigos de respaldo y almacénalos en un lugar seguro. Si pierdes el acceso a tu dispositivo de autenticación, puedes utilizar los códigos de respaldo para iniciar sesión.',
      successTitle: 'Verificación por SMS habilitada',
      title: 'Agregar verificación por SMS',
    },
    mfaTOTPPage: {
      authenticatorApp: {
        buttonAbleToScan__nonPrimary: 'Escanea el código QR en su lugar',
        buttonUnableToScan__nonPrimary: '¿No puedes escanear el código QR?',
        infoText__ableToScan:
          'Configura un nuevo método de inicio de sesión en tu aplicación de autenticación y escanea el siguiente código QR para vincularlo a tu cuenta.',
        infoText__unableToScan:
          'Configura un nuevo método de inicio de sesión en tu autenticador e ingresa la clave que se proporciona a continuación.',
        inputLabel__unableToScan1:
          'Asegúrate de que las contraseñas de Un-Solo-Uso o Por-Tiempo estén habilitadas, luego finaliza la vinculación con tu cuenta.',
        inputLabel__unableToScan2:
          'Alternativamente, si tu autenticador admite URIs TOTP, también puedes copiar la URI completa.',
      },
      removeResource: {
        messageLine1:
          'El código de verificación de este autenticador ya no será necesario al iniciar sesión.',
        messageLine2:
          'Es posible que tu cuenta no sea tan segura. ¿Estás seguro de que quieres continuar?',
        successMessage:
          'Se eliminó la verificación en dos pasos a través de la aplicación de autenticación.',
        title: 'Eliminar la verificación en dos pasos',
      },
      successMessage:
        'La verificación en dos pasos ahora está habilitada. Al iniciar sesión, deberás ingresar un código de verificación de este autenticador como un paso adicional.',
      title: 'Agregar aplicación de autenticación',
      verifySubtitle:
        'Ingresa el código de verificación generado por tu autenticador',
      verifyTitle: 'Código de verificación',
    },
    mobileButton__menu: 'Menú',
    navbar: {
      account: 'Perfil',
      apiKeys: 'Claves de API',
      billing: 'Facturación',
      description: 'Administra la información de tu cuenta.',
      security: 'Seguridad',
      title: 'Cuenta',
    },
    passkeyScreen: {
      removeResource: {
        messageLine1: '{{name}} será eliminada de esta cuenta.',
        title: 'Eliminar llave de acceso',
      },
      subtitle__rename:
        'Puedes cambiar el nombre de la llave de acceso para que sea más fácil de encontrar.',
      title__rename: 'Renombrar llave de acceso',
    },
    passwordPage: {
      checkboxInfoText__signOutOfOtherSessions:
        'Se recomienda cerrar la sesión de todos los otros dispositivos que hayan utilizado su antigua contraseña.',
      readonly:
        'Tu contraseña no se puede editar actualmente porque solo se puede acceder a través de la conexión de empresa.',
      successMessage__set: 'Se ha establecido tu contraseña.',
      successMessage__signOutOfOtherSessions:
        'Se cerró la sesión de todos los demás dispositivos.',
      successMessage__update: 'Tu contraseña ha sido actualizada.',
      title__set: 'Configurar contraseña',
      title__update: 'Cambiar contraseña',
    },
    phoneNumberPage: {
      infoText:
        'Se enviará un mensaje de texto con un enlace de verificación a este número de celular.',
      removeResource: {
        messageLine1: '{{identifier}} será eliminado de esta cuenta.',
        messageLine2: 'Ya no podrás iniciar sesión con este número de celular.',
        successMessage: '{{phoneNumber}} ha sido eliminado de tu cuenta.',
        title: 'Eliminar número de celular',
      },
      successMessage: '{{identifier}} ha sido agregado a tu cuenta.',
      title: 'Agregar el número de celular',
      verifySubtitle:
        'Ingresa el código de verificación enviado a {{identifier}}',
      verifyTitle: 'Verificar número de celular',
    },
    plansPage: {
      title: 'Planes',
    },
    profilePage: {
      fileDropAreaHint:
        'Carga una imagen JPG, PNG, GIF o WEBP de menos de 10 MB',
      imageFormDestructiveActionSubtitle: 'Eliminar la imagen',
      imageFormSubtitle: 'Cargar imagen',
      imageFormTitle: 'Imagen de perfil',
      readonly:
        'Tu información de perfil ha sido proporcionada por la conexión de empresa y no se puede editar.',
      successMessage: 'Tu perfil ha sido actualizado.',
      title: 'Actualizar perfil',
    },
    start: {
      activeDevicesSection: {
        destructiveAction: 'Cerrar sesión en el dispositivo',
        title: 'Dispositivos activos',
      },
      connectedAccountsSection: {
        actionLabel__connectionFailed: 'Inténtelo nuevamente',
        actionLabel__reauthorize: 'Autorizar ahora',
        destructiveActionTitle: 'Quitar',
        primaryButton: 'Conectar cuenta',
        subtitle__disconnected: 'Esta cuenta ha sido desconectada.',
        subtitle__reauthorize:
          'Los permisos requeridos han sido actualizados, y podrías experimentar limitaciones. Por favor, autoriza de nuevo esta aplicación para evitar cualquier problema',
        title: 'Cuentas conectadas',
      },
      dangerSection: {
        deleteAccountButton: 'Eliminar cuenta',
        title: 'Eliminar cuenta',
      },
      emailAddressesSection: {
        destructiveAction: 'Eliminar correo electrónico',
        detailsAction__nonPrimary: 'Establecer como primario',
        detailsAction__primary: 'Completar verificación',
        detailsAction__unverified: 'Completar verificación',
        primaryButton: 'Agregar correo electrónico',
        title: 'Correos electrónicos',
      },
      enterpriseAccountsSection: {
        title: 'Cuentas de empresa',
      },
      headerTitle__account: 'Detalles de la cuenta',
      headerTitle__security: 'Seguridad',
      mfaSection: {
        backupCodes: {
          actionLabel__regenerate: 'Regenerar',
          headerTitle: 'Códigos de respaldo',
          subtitle__regenerate:
            'Obtén un nuevo conjunto de códigos de respaldo seguros. Los códigos de respaldo anteriores se eliminarán y no podrán ser utilizados.',
          title__regenerate: 'Regenerar códigos de respaldo',
        },
        phoneCode: {
          actionLabel__setDefault: 'Establecer como predeterminado',
          destructiveActionLabel: 'Eliminar número telefónico',
        },
        primaryButton: 'Agregar verificación de dos pasos',
        title: 'Verificación de dos pasos',
        totp: {
          destructiveActionTitle: 'Eliminar',
          headerTitle: 'Aplicación de autenticación',
        },
      },
      passkeysSection: {
        menuAction__destructive: 'Eliminar',
        menuAction__rename: 'Renombrar',
        primaryButton: 'Agregar llave de acceso',
        title: 'Llaves de acceso',
      },
      passwordSection: {
        primaryButton__setPassword: 'Establecer contraseña ',
        primaryButton__updatePassword: 'Cambiar contraseña',
        title: 'Contraseña',
      },
      phoneNumbersSection: {
        destructiveAction: 'Eliminar número telefónico',
        detailsAction__nonPrimary: 'Establecer como primario',
        detailsAction__primary: 'Completar la verificación',
        detailsAction__unverified: 'Completar la verificación',
        primaryButton: 'Agregar un número telefónico',
        title: 'Números telefónicos',
      },
      profileSection: {
        primaryButton: 'Actualizar perfil',
        title: 'Perfil',
      },
      usernameSection: {
        primaryButton__setUsername: 'Definir nombre de usuario',
        primaryButton__updateUsername: 'Cambiar nombre de usuario',
        title: 'Nombre de usuario',
      },
      web3WalletsSection: {
        destructiveAction: 'Quitar billetera',
        detailsAction__nonPrimary: 'Establecer como primaria',
        primaryButton: 'Conectar billetera',
        title: 'Billeteras Web3',
        web3SelectSolanaWalletScreen: {
          subtitle:
            'Selecciona una billetera de Solana para conectarla a tu cuenta.',
          title: 'Agregar una billetera de Solana',
        },
      },
    },
    usernamePage: {
      successMessage: 'Tu nombre de usuario ha sido actualizado.',
      title__set: 'Actualizar nombre de usuario',
      title__update: 'Actualizar nombre de usuario',
    },
    web3WalletPage: {
      removeResource: {
        messageLine1: '{{identifier}} será eliminado de esta cuenta.',
        messageLine2: 'Ya no podrás iniciar sesión con esta billetera web3.',
        successMessage: '{{web3Wallet}} ha sido eliminado de tu cuenta.',
        title: 'Eliminar la billetera web3',
      },
      subtitle__availableWallets:
        'Selecciona una billetera web3 para conectarse a tu cuenta.',
      subtitle__unavailableWallets: 'No hay billeteras web3 disponibles.',
      successMessage: 'La billetera ha sido agregada a tu cuenta.',
      title: 'Agregar billetera web3',
      web3WalletButtonsBlockButton: '{{provider|titleize}}',
    },
  },
  waitlist: {
    start: {
      actionLink: 'Iniciar sesión',
      actionText: '¿Tienes una cuenta?',
      formButton: 'Únete a la lista de espera',
      subtitle:
        'Ingresa tu correo electrónico y te avisaremos cuando tú lugar esté listo',
      title: 'Únete a la lista de espera',
    },
    success: {
      message: 'Serás redirigido pronto...',
      subtitle: 'Nos pondremos en contacto contigo cuando tu lugar esté listo',
      title: '¡Gracias por unirte a la lista de espera!',
    },
  },
  web3SolanaWalletButtons: {
    connect: 'Conectar con {{walletName}}',
    continue: 'Continuar con {{walletName}}',
    noneAvailable:
      'No se detectaron billeteras Web3 de Solana. Instala una {{ solanaWalletsLink || link("wallet extension") }} compatible con Web3.',
  },
} as const
