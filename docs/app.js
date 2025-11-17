// CIS Controls Roadmap Tool - Main Application
// Bilingual (English/Arabic) Implementation

// Application State
const appState = {
  currentLanguage: 'en',
  currentView: 'dashboard',
  organizationProfile: null,
  controlStatuses: {},
  assessmentDate: null,
  roadmapConfig: null,
  selectedFrameworks: ['NIST', 'ISO27001'],
  assessments: []
};

// CIS Controls Data
const cisControls = [
  {
    id: 1,
    title_en: "Inventory and Control of Enterprise Assets",
    title_ar: "جرد ومراقبة أصول المؤسسة",
    description_en: "Actively manage (inventory, track, and correct) all enterprise assets (end-user devices, including portable and mobile; network devices; non-computing/IoT devices; and servers) connected to the infrastructure physically, virtually, remotely, and those within cloud environments, to accurately know the totality of assets that need to be monitored and protected within the enterprise.",
    description_ar: "إدارة فعالة (جرد وتتبع وتصحيح) لجميع أصول المؤسسة (أجهزة المستخدم النهائي، بما في ذلك المحمولة والمتنقلة؛ أجهزة الشبكة؛ أجهزة إنترنت الأشياء؛ والخوادم) المتصلة بالبنية التحتية ماديًا أو افتراضيًا أو عن بُعد وتلك الموجودة في البيئات السحابية.",
    ig1_safeguards: 5,
    ig2_safeguards: 3,
    ig3_safeguards: 0,
    effort: "Medium"
  },
  {
    id: 2,
    title_en: "Inventory and Control of Software Assets",
    title_ar: "جرد ومراقبة الأصول البرمجية",
    description_en: "Actively manage (inventory, track, and correct) all software (operating systems and applications) on the network so that only authorized software is installed and can execute, and that unauthorized and unmanaged software is found and prevented from installation or execution.",
    description_ar: "إدارة فعالة (جرد وتتبع وتصحيح) لجميع البرمجيات (أنظمة التشغيل والتطبيقات) على الشبكة بحيث يتم تثبيت البرامج المصرح بها فقط ويمكن تنفيذها، وأن البرامج غير المصرح بها وغير المُدارة يتم العثور عليها ومنعها من التثبيت أو التنفيذ.",
    ig1_safeguards: 5,
    ig2_safeguards: 2,
    ig3_safeguards: 0,
    effort: "Medium"
  },
  {
    id: 3,
    title_en: "Data Protection",
    title_ar: "حماية البيانات",
    description_en: "Develop processes and technical controls to identify, classify, securely handle, retain, and dispose of data.",
    description_ar: "تطوير العمليات والضوابط الفنية لتحديد البيانات وتصنيفها ومعالجتها بشكل آمن والاحتفاظ بها والتخلص منها.",
    ig1_safeguards: 3,
    ig2_safeguards: 7,
    ig3_safeguards: 4,
    effort: "High"
  },
  {
    id: 4,
    title_en: "Secure Configuration of Enterprise Assets and Software",
    title_ar: "التكوين الآمن لأصول المؤسسة والبرمجيات",
    description_en: "Establish and maintain the secure configuration of enterprise assets (end-user devices, including portable and mobile; network devices; non-computing/IoT devices; and servers) and software (operating systems and applications).",
    description_ar: "إنشاء وصيانة التكوين الآمن لأصول المؤسسة (أجهزة المستخدم النهائي، بما في ذلك المحمولة والمتنقلة؛ أجهزة الشبكة؛ أجهزة إنترنت الأشياء؛ والخوادم) والبرمجيات (أنظمة التشغيل والتطبيقات).",
    ig1_safeguards: 7,
    ig2_safeguards: 5,
    ig3_safeguards: 0,
    effort: "High"
  },
  {
    id: 5,
    title_en: "Account Management",
    title_ar: "إدارة الحسابات",
    description_en: "Use processes and tools to assign and manage authorization to credentials for user accounts, including administrator accounts, as well as service accounts, to enterprise assets and software.",
    description_ar: "استخدام العمليات والأدوات لتعيين وإدارة التفويض لبيانات الاعتماد لحسابات المستخدمين، بما في ذلك حسابات المسؤولين، وكذلك حسابات الخدمة، لأصول المؤسسة والبرمجيات.",
    ig1_safeguards: 5,
    ig2_safeguards: 1,
    ig3_safeguards: 0,
    effort: "Medium"
  },
  {
    id: 6,
    title_en: "Access Control Management",
    title_ar: "إدارة التحكم في الوصول",
    description_en: "Use processes and tools to create, assign, manage, and revoke access credentials and privileges for user, administrator, and service accounts for enterprise assets and software.",
    description_ar: "استخدام العمليات والأدوات لإنشاء وتعيين وإدارة وإلغاء بيانات اعتماد الوصول والامتيازات لحسابات المستخدمين والمسؤولين والخدمات لأصول المؤسسة والبرمجيات.",
    ig1_safeguards: 4,
    ig2_safeguards: 4,
    ig3_safeguards: 0,
    effort: "Medium"
  },
  {
    id: 7,
    title_en: "Continuous Vulnerability Management",
    title_ar: "الإدارة المستمرة للثغرات",
    description_en: "Develop a plan to continuously assess and track vulnerabilities on all enterprise assets within the enterprise's infrastructure, in order to remediate, and minimize, the window of opportunity for attackers.",
    description_ar: "تطوير خطة لتقييم وتتبع الثغرات بشكل مستمر على جميع أصول المؤسسة ضمن البنية التحتية للمؤسسة، من أجل معالجة وتقليل نافذة الفرصة للمهاجمين.",
    ig1_safeguards: 4,
    ig2_safeguards: 3,
    ig3_safeguards: 0,
    effort: "High"
  },
  {
    id: 8,
    title_en: "Audit Log Management",
    title_ar: "إدارة سجلات التدقيق",
    description_en: "Collect, alert, review, and retain audit logs of events that could help detect, understand, or recover from an attack.",
    description_ar: "جمع وتنبيه ومراجعة والاحتفاظ بسجلات التدقيق للأحداث التي يمكن أن تساعد في اكتشاف أو فهم أو التعافي من هجوم.",
    ig1_safeguards: 3,
    ig2_safeguards: 8,
    ig3_safeguards: 1,
    effort: "High"
  },
  {
    id: 9,
    title_en: "Email and Web Browser Protections",
    title_ar: "حماية البريد الإلكتروني ومتصفح الويب",
    description_en: "Improve protections and detections of threats from email and web vectors, as these are opportunities for attackers to manipulate human behavior through direct engagement.",
    description_ar: "تحسين الحماية والكشف عن التهديدات من البريد الإلكتروني ومتجهات الويب، حيث أن هذه فرص للمهاجمين للتلاعب بالسلوك البشري من خلال المشاركة المباشرة.",
    ig1_safeguards: 3,
    ig2_safeguards: 4,
    ig3_safeguards: 0,
    effort: "Medium"
  },
  {
    id: 10,
    title_en: "Malware Defenses",
    title_ar: "دفاعات البرامج الضارة",
    description_en: "Prevent or control the installation, spread, and execution of malicious applications, code, or scripts on enterprise assets.",
    description_ar: "منع أو التحكم في تثبيت ونشر وتنفيذ التطبيقات أو التعليمات البرمجية أو البرامج النصية الضارة على أصول المؤسسة.",
    ig1_safeguards: 3,
    ig2_safeguards: 4,
    ig3_safeguards: 0,
    effort: "Medium"
  },
  {
    id: 11,
    title_en: "Data Recovery",
    title_ar: "استعادة البيانات",
    description_en: "Establish and maintain data recovery practices sufficient to restore in-scope enterprise assets to a pre-incident and trusted state.",
    description_ar: "إنشاء وصيانة ممارسات استعادة البيانات الكافية لاستعادة أصول المؤسسة المعنية إلى حالة ما قبل الحادث وحالة موثوقة.",
    ig1_safeguards: 5,
    ig2_safeguards: 0,
    ig3_safeguards: 0,
    effort: "Medium"
  },
  {
    id: 12,
    title_en: "Network Infrastructure Management",
    title_ar: "إدارة البنية التحتية للشبكة",
    description_en: "Establish, implement, and actively manage (track, report, correct) network devices, in order to prevent attackers from exploiting vulnerable network services and access points.",
    description_ar: "إنشاء وتنفيذ وإدارة فعالة (تتبع، إبلاغ، تصحيح) لأجهزة الشبكة، من أجل منع المهاجمين من استغلال خدمات الشبكة ونقاط الوصول الضعيفة.",
    ig1_safeguards: 0,
    ig2_safeguards: 8,
    ig3_safeguards: 0,
    effort: "High"
  },
  {
    id: 13,
    title_en: "Network Monitoring and Defense",
    title_ar: "مراقبة الشبكة والدفاع عنها",
    description_en: "Operate processes and tooling to establish and maintain comprehensive network monitoring and defense against security threats across the enterprise's network infrastructure and user base.",
    description_ar: "تشغيل العمليات والأدوات لإنشاء وصيانة المراقبة الشاملة للشبكة والدفاع ضد التهديدات الأمنية عبر البنية التحتية للشبكة وقاعدة المستخدمين في المؤسسة.",
    ig1_safeguards: 0,
    ig2_safeguards: 9,
    ig3_safeguards: 2,
    effort: "High"
  },
  {
    id: 14,
    title_en: "Security Awareness and Skills Training",
    title_ar: "التوعية الأمنية والتدريب على المهارات",
    description_en: "Establish and maintain a security awareness program to influence behavior among the workforce to be security conscious and properly skilled to reduce cybersecurity risks to the enterprise.",
    description_ar: "إنشاء وصيانة برنامج للتوعية الأمنية للتأثير على سلوك القوى العاملة لتكون واعية أمنيًا وماهرة بشكل صحيح لتقليل المخاطر السيبرانية على المؤسسة.",
    ig1_safeguards: 4,
    ig2_safeguards: 5,
    ig3_safeguards: 0,
    effort: "Low"
  },
  {
    id: 15,
    title_en: "Service Provider Management",
    title_ar: "إدارة مزودي الخدمة",
    description_en: "Develop a process to evaluate service providers who hold sensitive data, or are responsible for an enterprise's critical IT platforms or processes, to ensure these providers are protecting those platforms and data appropriately.",
    description_ar: "تطوير عملية لتقييم مزودي الخدمة الذين يحتفظون ببيانات حساسة، أو المسؤولين عن منصات أو عمليات تقنية المعلومات الحيوية للمؤسسة، لضمان أن هؤلاء المزودين يحمون تلك المنصات والبيانات بشكل مناسب.",
    ig1_safeguards: 0,
    ig2_safeguards: 7,
    ig3_safeguards: 0,
    effort: "Medium"
  },
  {
    id: 16,
    title_en: "Application Software Security",
    title_ar: "أمن البرمجيات التطبيقية",
    description_en: "Manage the security life cycle of in-house developed, hosted, or acquired software to prevent, detect, and remediate security weaknesses before they can impact the enterprise.",
    description_ar: "إدارة دورة حياة الأمان للبرامج المطورة داخليًا أو المستضافة أو المكتسبة لمنع واكتشاف ومعالجة نقاط الضعف الأمنية قبل أن تؤثر على المؤسسة.",
    ig1_safeguards: 0,
    ig2_safeguards: 9,
    ig3_safeguards: 5,
    effort: "High"
  },
  {
    id: 17,
    title_en: "Incident Response Management",
    title_ar: "إدارة الاستجابة للحوادث",
    description_en: "Establish a program to develop and maintain an incident response capability (e.g., policies, plans, procedures, defined roles, training, and communications) to prepare, detect, and quickly respond to an attack.",
    description_ar: "إنشاء برنامج لتطوير وصيانة قدرة الاستجابة للحوادث (على سبيل المثال، السياسات والخطط والإجراءات والأدوار المحددة والتدريب والاتصالات) للتحضير والكشف والاستجابة بسرعة لهجوم.",
    ig1_safeguards: 3,
    ig2_safeguards: 6,
    ig3_safeguards: 0,
    effort: "Medium"
  },
  {
    id: 18,
    title_en: "Penetration Testing",
    title_ar: "اختبار الاختراق",
    description_en: "Test the effectiveness and resiliency of enterprise assets through identifying and exploiting weaknesses in controls (people, processes, and technology), and simulating the objectives and actions of an attacker.",
    description_ar: "اختبار فعالية ومرونة أصول المؤسسة من خلال تحديد واستغلال نقاط الضعف في الضوابط (الأشخاص والعمليات والتكنولوجيا)، ومحاكاة أهداف وإجراءات المهاجم.",
    ig1_safeguards: 0,
    ig2_safeguards: 0,
    ig3_safeguards: 5,
    effort: "High"
  }
];

// Sector priority mappings
const sectorPriorities = {
  financial: [1, 3, 5, 6, 8, 17],
  healthcare: [3, 6, 8, 11, 14, 17],
  government: [1, 2, 3, 6, 8, 13],
  energy: [1, 4, 7, 12, 13, 17],
  telecom: [1, 7, 12, 13, 17, 18],
  manufacturing: [1, 4, 7, 10, 12, 17],
  retail: [3, 5, 6, 9, 10, 14],
  other: [1, 2, 3, 5, 6, 7]
};

// Translation Dictionary
const translations = {
  en: {
    appTitle: "CIS Controls Roadmap Tool",
    welcomeTitle: "Welcome to CIS Controls Roadmap Tool",
    welcomeSubtitle: "Professional gap analysis and implementation planning for CIS Controls v8.1",
    totalControlsLabel: "Total CIS Controls",
    totalSafeguardsLabel: "Total Safeguards",
    ig1Label: "IG1 Safeguards",
    ig2Label: "IG2 Safeguards",
    quickStartTitle: "Quick Start",
    quickStartDesc: "Begin a new assessment or load an existing one",
    newAssessment: "New Assessment",
    loadAssessment: "Load Assessment",
    progressTitle: "Assessment Progress",
    completedLabel: "Completed",
    recentTitle: "Recent Assessments",
    profileTitle: "Organization Profile",
    profileSubtitle: "Provide your organization details to customize the assessment",
    orgNameLabel: "Organization Name",
    sectorLabel: "Sector",
    sizeLabel: "Organization Size",
    maturityLabel: "Current Maturity Level",
    targetIGLabel: "Target Implementation Group",
    regionLabel: "Regional Focus",
    complianceLabel: "Compliance Requirements (Select all that apply)",
    saveProfileBtn: "Save Profile & Continue",
    gapAnalysisTitle: "Gap Analysis",
    gapAnalysisSubtitle: "Assess your implementation status for each CIS Control",
    igScoreLabel: "IG Score",
    priorityGapsLabel: "Priority Gaps",
    controlsTitle: "CIS Controls Assessment",
    roadmapTitle: "Implementation Roadmap",
    roadmapSubtitle: "Generate and customize your implementation timeline",
    timelineConfigTitle: "Timeline Configuration",
    startDateLabel: "Project Start Date",
    durationLabel: "Duration",
    resourcesLabel: "Resource Allocation",
    generateBtnText: "Generate Roadmap",
    phasesTitle: "Implementation Phases",
    phase1Label: "Phase 1: Quick Wins",
    phase2Label: "Phase 2: Foundation",
    phase3Label: "Phase 3: Enhancement",
    phase4Label: "Phase 4: Advanced",
    phase5Label: "Phase 5: Optimization",
    frameworksTitle: "Framework Mapping",
    frameworksSubtitle: "Visualize how CIS Controls map to other frameworks",
    selectFrameworksTitle: "Select Frameworks to Compare",
    matrixViewBtn: "Matrix View",
    radarViewBtn: "Radar View",
    regionalTemplatesTitle: "Regional Compliance Templates",
    kuwaitBankingTemplate: "Kuwait Banking",
    saudiFinancialTemplate: "Saudi Financial",
    gccHealthcareTemplate: "GCC Healthcare",
    criticalInfraTemplate: "Critical Infrastructure",
    reportsTitle: "Reports",
    reportsSubtitle: "Generate comprehensive reports and export data",
    executiveReportTitle: "Executive Summary",
    executiveReportDesc: "High-level compliance status and key recommendations",
    generateExecBtn: "Generate Report",
    detailedReportTitle: "Detailed Gap Analysis",
    detailedReportDesc: "Complete control-by-control assessment",
    generateDetailedBtn: "Generate Report",
    roadmapReportTitle: "Implementation Roadmap",
    roadmapReportDesc: "Phased implementation plan with timelines",
    generateRoadmapRepBtn: "Generate Report",
    frameworkReportTitle: "Framework Compliance",
    frameworkReportDesc: "Mapping to selected frameworks",
    generateFrameworkBtn: "Generate Report",
    exportDataTitle: "Export Assessment Data",
    exportJSONText: "Export JSON",
    exportExcelText: "Export Excel (CSV)",
    importJSONText: "Import JSON",
    dataManagementTitle: "Data Management",
    saveLocalText: "Save to Browser",
    loadLocalText: "Load from Browser",
    clearDataText: "Clear All Data",
    printText: "Print Report",
    closeText: "Close",
    notStarted: "Not Started",
    planning: "Planning",
    inProgress: "In Progress",
    partial: "Partially Implemented",
    complete: "Fully Implemented",
    implementationStatus: "Implementation Status",
    priority: "Priority",
    effort: "Effort",
    notes: "Notes",
    safeguards: "Safeguards",
    critical: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low"
  },
  ar: {
    appTitle: "أداة خارطة طريق ضوابط CIS",
    welcomeTitle: "مرحبًا بك في أداة خارطة طريق ضوابط CIS",
    welcomeSubtitle: "تحليل الفجوات المهني وتخطيط التنفيذ لضوابط CIS الإصدار 8.1",
    totalControlsLabel: "إجمالي ضوابط CIS",
    totalSafeguardsLabel: "إجمالي الضمانات",
    ig1Label: "ضمانات IG1",
    ig2Label: "ضمانات IG2",
    quickStartTitle: "البدء السريع",
    quickStartDesc: "ابدأ تقييمًا جديدًا أو قم بتحميل تقييم موجود",
    newAssessment: "تقييم جديد",
    loadAssessment: "تحميل تقييم",
    progressTitle: "تقدم التقييم",
    completedLabel: "مكتمل",
    recentTitle: "التقييمات الأخيرة",
    profileTitle: "ملف المؤسسة",
    profileSubtitle: "قدم تفاصيل مؤسستك لتخصيص التقييم",
    orgNameLabel: "اسم المؤسسة",
    sectorLabel: "القطاع",
    sizeLabel: "حجم المؤسسة",
    maturityLabel: "مستوى النضج الحالي",
    targetIGLabel: "مجموعة التنفيذ المستهدفة",
    regionLabel: "التركيز الإقليمي",
    complianceLabel: "متطلبات الامتثال (حدد كل ما ينطبق)",
    saveProfileBtn: "حفظ الملف والمتابعة",
    gapAnalysisTitle: "تحليل الفجوات",
    gapAnalysisSubtitle: "قيّم حالة التنفيذ لكل ضابط من ضوابط CIS",
    igScoreLabel: "درجة IG",
    priorityGapsLabel: "الفجوات ذات الأولوية",
    controlsTitle: "تقييم ضوابط CIS",
    roadmapTitle: "خارطة طريق التنفيذ",
    roadmapSubtitle: "أنشئ وخصص جدولك الزمني للتنفيذ",
    timelineConfigTitle: "تكوين الجدول الزمني",
    startDateLabel: "تاريخ بدء المشروع",
    durationLabel: "المدة",
    resourcesLabel: "تخصيص الموارد",
    generateBtnText: "إنشاء خارطة الطريق",
    phasesTitle: "مراحل التنفيذ",
    phase1Label: "المرحلة 1: الانتصارات السريعة",
    phase2Label: "المرحلة 2: الأساس",
    phase3Label: "المرحلة 3: التحسين",
    phase4Label: "المرحلة 4: المتقدم",
    phase5Label: "المرحلة 5: التحسين المستمر",
    frameworksTitle: "تخطيط الأطر",
    frameworksSubtitle: "تصور كيفية ربط ضوابط CIS بالأطر الأخرى",
    selectFrameworksTitle: "اختر الأطر للمقارنة",
    matrixViewBtn: "عرض المصفوفة",
    radarViewBtn: "عرض الرادار",
    regionalTemplatesTitle: "قوالب الامتثال الإقليمية",
    kuwaitBankingTemplate: "الخدمات المصرفية الكويتية",
    saudiFinancialTemplate: "المالية السعودية",
    gccHealthcareTemplate: "الرعاية الصحية الخليجية",
    criticalInfraTemplate: "البنية التحتية الحيوية",
    reportsTitle: "التقارير",
    reportsSubtitle: "أنشئ تقارير شاملة وصدّر البيانات",
    executiveReportTitle: "الملخص التنفيذي",
    executiveReportDesc: "حالة الامتثال عالية المستوى والتوصيات الرئيسية",
    generateExecBtn: "إنشاء التقرير",
    detailedReportTitle: "تحليل الفجوات التفصيلي",
    detailedReportDesc: "تقييم كامل لكل ضابط على حدة",
    generateDetailedBtn: "إنشاء التقرير",
    roadmapReportTitle: "خارطة طريق التنفيذ",
    roadmapReportDesc: "خطة تنفيذ مرحلية مع جداول زمنية",
    generateRoadmapRepBtn: "إنشاء التقرير",
    frameworkReportTitle: "امتثال الأطر",
    frameworkReportDesc: "الربط بالأطر المحددة",
    generateFrameworkBtn: "إنشاء التقرير",
    exportDataTitle: "تصدير بيانات التقييم",
    exportJSONText: "تصدير JSON",
    exportExcelText: "تصدير Excel (CSV)",
    importJSONText: "استيراد JSON",
    dataManagementTitle: "إدارة البيانات",
    saveLocalText: "حفظ في المتصفح",
    loadLocalText: "تحميل من المتصفح",
    clearDataText: "مسح جميع البيانات",
    printText: "طباعة التقرير",
    closeText: "إغلاق",
    notStarted: "لم يبدأ",
    planning: "التخطيط",
    inProgress: "قيد التنفيذ",
    partial: "منفذ جزئيًا",
    complete: "منفذ بالكامل",
    implementationStatus: "حالة التنفيذ",
    priority: "الأولوية",
    effort: "الجهد",
    notes: "ملاحظات",
    safeguards: "الضمانات",
    critical: "حرج",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض"
  }
};

// Initialize application
function init() {
  setupEventListeners();
  setTodayDate();
  renderControlsList();
  updateDashboard();
  updateLanguage();
}

// Setup event listeners
function setupEventListeners() {
  // Language toggle
  document.getElementById('languageToggle').addEventListener('click', toggleLanguage);
  
  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const view = e.currentTarget.dataset.view;
      switchView(view);
    });
  });
  
  // Dashboard actions
  document.getElementById('newAssessmentBtn').addEventListener('click', () => switchView('profile'));
  document.getElementById('loadAssessmentBtn').addEventListener('click', loadFromBrowser);
  
  // Profile form
  document.getElementById('profileForm').addEventListener('submit', handleProfileSubmit);
  
  // Status filter
  document.getElementById('statusFilter').addEventListener('change', filterControls);
  
  // Roadmap generation
  document.getElementById('generateRoadmapBtn').addEventListener('click', generateRoadmap);
  
  // Framework view toggle
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleFrameworkView);
  });
  
  // Framework checkboxes
  document.querySelectorAll('input[name="framework"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateFrameworkMapping);
  });
  
  // Report generation
  document.querySelectorAll('.generate-report-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const reportType = e.currentTarget.dataset.reportType;
      generateReport(reportType);
    });
  });
  
  // Export/Import
  document.getElementById('exportJSONBtn').addEventListener('click', exportJSON);
  document.getElementById('exportExcelBtn').addEventListener('click', exportExcel);
  document.getElementById('importJSONBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
  });
  document.getElementById('importFile').addEventListener('change', importJSON);
  
  // Data management
  document.getElementById('saveLocalBtn').addEventListener('click', saveToBrowser);
  document.getElementById('loadLocalBtn').addEventListener('click', loadFromBrowser);
  document.getElementById('clearDataBtn').addEventListener('click', clearAllData);
  
  // Modal
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  document.getElementById('printReportBtn').addEventListener('click', () => window.print());
  
  // Template selection
  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const template = e.currentTarget.dataset.template;
      applyTemplate(template);
    });
  });
}

// Toggle language
function toggleLanguage() {
  appState.currentLanguage = appState.currentLanguage === 'en' ? 'ar' : 'en';
  updateLanguage();
}

// Update all UI text based on current language
function updateLanguage() {
  const lang = appState.currentLanguage;
  const t = translations[lang];
  
  // Toggle RTL
  document.body.classList.toggle('rtl', lang === 'ar');
  document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
  
  // Update language button
  document.getElementById('langText').textContent = lang === 'en' ? 'العربية' : 'English';
  
  // Update all translatable elements
  Object.keys(t).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = t[key];
      } else {
        element.textContent = t[key];
      }
    }
  });
  
  // Update navigation
  const navTexts = {
    'dashboard': lang === 'en' ? 'Dashboard' : 'لوحة التحكم',
    'profile': lang === 'en' ? 'Organization Profile' : 'ملف المؤسسة',
    'gap-analysis': lang === 'en' ? 'Gap Analysis' : 'تحليل الفجوات',
    'roadmap': lang === 'en' ? 'Roadmap' : 'خارطة الطريق',
    'frameworks': lang === 'en' ? 'Framework Mapping' : 'تخطيط الأطر',
    'reports': lang === 'en' ? 'Reports' : 'التقارير'
  };
  
  document.querySelectorAll('.nav-item').forEach(item => {
    const view = item.dataset.view;
    const textSpan = item.querySelector('.nav-text');
    if (textSpan && navTexts[view]) {
      textSpan.textContent = navTexts[view];
    }
  });
  
  // Re-render controls list with new language
  renderControlsList();
  updateDashboard();
}

// Switch view
function switchView(viewName) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewName);
  });
  
  // Update views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  
  document.getElementById(viewName).classList.add('active');
  appState.currentView = viewName;
}

// Set today's date in date input
function setTodayDate() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('startDate').value = today;
}

// Handle profile form submission
function handleProfileSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const compliance = [];
  formData.getAll('compliance').forEach(val => compliance.push(val));
  
  appState.organizationProfile = {
    name: document.getElementById('orgName').value,
    sector: document.getElementById('sector').value,
    size: document.getElementById('orgSize').value,
    maturity: document.getElementById('maturity').value,
    targetIG: document.getElementById('targetIG').value,
    region: document.getElementById('region').value,
    compliance: compliance
  };
  
  appState.assessmentDate = new Date().toISOString();
  
  showToast(appState.currentLanguage === 'en' ? 'Profile saved successfully!' : 'تم حفظ الملف بنجاح!', 'success');
  switchView('gap-analysis');
  renderControlsList();
}

// Render controls list for gap analysis
function renderControlsList() {
  const container = document.getElementById('controlsList');
  const lang = appState.currentLanguage;
  const t = translations[lang];
  
  container.innerHTML = '';
  
  cisControls.forEach(control => {
    const status = appState.controlStatuses[control.id] || { status: 0, priority: 'Medium', notes: '' };
    const priority = calculatePriority(control.id);
    
    const statusText = getStatusText(status.status);
    const statusClass = getStatusClass(status.status);
    
    const safeguardsCount = getSafeguardsCount(control);
    
    const controlDiv = document.createElement('div');
    controlDiv.className = 'control-item';
    controlDiv.innerHTML = `
      <div class="control-header">
        <div class="control-title">
          <div class="control-id">${control.id}</div>
          <div class="control-name">${lang === 'en' ? control.title_en : control.title_ar}</div>
        </div>
        <div class="control-status">
          <span class="status-badge ${statusClass}">${statusText}</span>
          <span class="expand-icon">▼</span>
        </div>
      </div>
      <div class="control-body">
        <p class="control-description">${lang === 'en' ? control.description_en : control.description_ar}</p>
        <div class="control-meta">
          <div class="meta-item">
            <div class="meta-label">${t.safeguards}</div>
            <div class="meta-value">${safeguardsCount}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">${t.priority}</div>
            <div class="meta-value">${priority}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">${t.effort}</div>
            <div class="meta-value">${control.effort}</div>
          </div>
        </div>
        <div class="control-assessment">
          <div class="form-group">
            <label class="form-label">${t.implementationStatus}</label>
            <select class="form-control" data-control-id="${control.id}" data-field="status">
              <option value="0" ${status.status === 0 ? 'selected' : ''}>${t.notStarted} (0%)</option>
              <option value="25" ${status.status === 25 ? 'selected' : ''}>${t.planning} (25%)</option>
              <option value="50" ${status.status === 50 ? 'selected' : ''}>${t.inProgress} (50%)</option>
              <option value="75" ${status.status === 75 ? 'selected' : ''}>${t.partial} (75%)</option>
              <option value="100" ${status.status === 100 ? 'selected' : ''}>${t.complete} (100%)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${t.notes}</label>
            <textarea class="form-control" rows="2" data-control-id="${control.id}" data-field="notes" placeholder="${t.notes}">${status.notes || ''}</textarea>
          </div>
        </div>
      </div>
    `;
    
    // Add toggle functionality
    const header = controlDiv.querySelector('.control-header');
    header.addEventListener('click', () => {
      controlDiv.classList.toggle('expanded');
    });
    
    // Add change listeners
    const statusSelect = controlDiv.querySelector('select[data-field="status"]');
    statusSelect.addEventListener('change', (e) => {
      updateControlStatus(control.id, 'status', parseInt(e.target.value));
    });
    
    const notesTextarea = controlDiv.querySelector('textarea[data-field="notes"]');
    notesTextarea.addEventListener('change', (e) => {
      updateControlStatus(control.id, 'notes', e.target.value);
    });
    
    container.appendChild(controlDiv);
  });
  
  // Update gap analysis visuals
  updateGapAnalysis();
}

// Get safeguards count based on target IG
function getSafeguardsCount(control) {
  const targetIG = appState.organizationProfile?.targetIG || 'IG1';
  
  if (targetIG === 'IG1') {
    return control.ig1_safeguards;
  } else if (targetIG === 'IG2') {
    return control.ig1_safeguards + control.ig2_safeguards;
  } else {
    return control.ig1_safeguards + control.ig2_safeguards + control.ig3_safeguards;
  }
}

// Calculate priority based on sector and profile
function calculatePriority(controlId) {
  const profile = appState.organizationProfile;
  const lang = appState.currentLanguage;
  const t = translations[lang];
  
  if (!profile) return t.medium;
  
  const sectorPriorityControls = sectorPriorities[profile.sector] || [];
  
  if (sectorPriorityControls.includes(controlId)) {
    return t.critical;
  }
  
  // Check if control is in target IG
  const control = cisControls.find(c => c.id === controlId);
  if (!control) return t.medium;
  
  if (profile.targetIG === 'IG1' && control.ig1_safeguards > 0) {
    return t.high;
  } else if (profile.targetIG === 'IG2' && (control.ig1_safeguards > 0 || control.ig2_safeguards > 0)) {
    return t.high;
  } else if (profile.targetIG === 'IG3') {
    return t.high;
  }
  
  return t.medium;
}

// Get status text
function getStatusText(status) {
  const lang = appState.currentLanguage;
  const t = translations[lang];
  
  switch(status) {
    case 0: return t.notStarted;
    case 25: return t.planning;
    case 50: return t.inProgress;
    case 75: return t.partial;
    case 100: return t.complete;
    default: return t.notStarted;
  }
}

// Get status class
function getStatusClass(status) {
  if (status === 0) return 'not-started';
  if (status === 25) return 'planning';
  if (status === 50) return 'in-progress';
  if (status === 75) return 'partial';
  if (status === 100) return 'complete';
  return 'not-started';
}

// Update control status
function updateControlStatus(controlId, field, value) {
  if (!appState.controlStatuses[controlId]) {
    appState.controlStatuses[controlId] = { status: 0, priority: 'Medium', notes: '' };
  }
  
  appState.controlStatuses[controlId][field] = value;
  
  // Update visuals
  updateGapAnalysis();
  updateDashboard();
}

// Filter controls
function filterControls() {
  const filterValue = document.getElementById('statusFilter').value;
  const controls = document.querySelectorAll('.control-item');
  
  controls.forEach(control => {
    if (filterValue === 'all') {
      control.style.display = 'block';
    } else {
      const select = control.querySelector('select[data-field="status"]');
      if (select && select.value === filterValue) {
        control.style.display = 'block';
      } else {
        control.style.display = 'none';
      }
    }
  });
}

// Update gap analysis visuals
function updateGapAnalysis() {
  const overallScore = calculateOverallScore();
  const igScore = calculateIGScore();
  const priorityGaps = calculatePriorityGaps();
  
  // Update gauge chart
  createComplianceGauge(overallScore);
  
  // Update scores
  document.getElementById('igScore').textContent = `${Math.round(igScore)}%`;
  document.getElementById('priorityGapsCount').textContent = priorityGaps;
  
  // Update bar chart
  createGapChart();
}

// Calculate overall compliance score
function calculateOverallScore() {
  const controlIds = Object.keys(appState.controlStatuses);
  if (controlIds.length === 0) return 0;
  
  const totalStatus = controlIds.reduce((sum, id) => {
    return sum + (appState.controlStatuses[id].status || 0);
  }, 0);
  
  return totalStatus / controlIds.length;
}

// Calculate IG-specific score
function calculateIGScore() {
  const targetIG = appState.organizationProfile?.targetIG || 'IG1';
  let relevantControls = [];
  
  cisControls.forEach(control => {
    if (targetIG === 'IG1' && control.ig1_safeguards > 0) {
      relevantControls.push(control.id);
    } else if (targetIG === 'IG2' && (control.ig1_safeguards > 0 || control.ig2_safeguards > 0)) {
      relevantControls.push(control.id);
    } else if (targetIG === 'IG3') {
      relevantControls.push(control.id);
    }
  });
  
  if (relevantControls.length === 0) return 0;
  
  const totalStatus = relevantControls.reduce((sum, id) => {
    return sum + (appState.controlStatuses[id]?.status || 0);
  }, 0);
  
  return totalStatus / relevantControls.length;
}

// Calculate priority gaps
function calculatePriorityGaps() {
  const profile = appState.organizationProfile;
  if (!profile) return 0;
  
  const priorityControls = sectorPriorities[profile.sector] || [];
  
  return priorityControls.filter(controlId => {
    const status = appState.controlStatuses[controlId]?.status || 0;
    return status < 100;
  }).length;
}

// Create compliance gauge chart
function createComplianceGauge(score) {
  const canvas = document.getElementById('complianceGauge');
  const ctx = canvas.getContext('2d');
  
  // Clear existing chart
  if (window.complianceGaugeChart) {
    window.complianceGaugeChart.destroy();
  }
  
  window.complianceGaugeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: [
          score < 25 ? '#DC3545' : score < 50 ? '#FFA500' : score < 75 ? '#0066CC' : '#28A745',
          '#F5F5F5'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '75%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
}

// Create gap analysis bar chart
function createGapChart() {
  const canvas = document.getElementById('gapChart');
  const ctx = canvas.getContext('2d');
  const lang = appState.currentLanguage;
  
  // Clear existing chart
  if (window.gapChart) {
    window.gapChart.destroy();
  }
  
  const labels = cisControls.map(c => lang === 'en' ? `C${c.id}` : `ض${c.id}`);
  const data = cisControls.map(c => appState.controlStatuses[c.id]?.status || 0);
  const colors = data.map(d => {
    if (d < 25) return '#DC3545';
    if (d < 50) return '#FFA500';
    if (d < 75) return '#0066CC';
    return '#28A745';
  });
  
  window.gapChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: lang === 'en' ? 'Implementation %' : 'نسبة التنفيذ %',
        data: data,
        backgroundColor: colors,
        borderWidth: 0
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// Update dashboard
function updateDashboard() {
  const overallScore = calculateOverallScore();
  
  // Update progress display
  document.getElementById('overallProgress').textContent = `${Math.round(overallScore)}%`;
  
  // Create progress chart
  createProgressChart(overallScore);
}

// Create progress chart
function createProgressChart(score) {
  const canvas = document.getElementById('progressChart');
  const ctx = canvas.getContext('2d');
  
  // Clear existing chart
  if (window.progressChart) {
    window.progressChart.destroy();
  }
  
  window.progressChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: [
          score < 25 ? '#DC3545' : score < 50 ? '#FFA500' : score < 75 ? '#0066CC' : '#28A745',
          '#F5F5F5'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: false,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
}

// Generate roadmap
function generateRoadmap() {
  const startDate = document.getElementById('startDate').value;
  const duration = parseInt(document.getElementById('duration').value);
  const resources = document.getElementById('resources').value;
  
  if (!startDate) {
    showToast(appState.currentLanguage === 'en' ? 'Please select a start date' : 'الرجاء تحديد تاريخ البدء', 'warning');
    return;
  }
  
  appState.roadmapConfig = { startDate, duration, resources };
  
  // Show roadmap display
  document.getElementById('roadmapDisplay').style.display = 'block';
  
  // Create roadmap chart
  createRoadmapChart();
  
  showToast(appState.currentLanguage === 'en' ? 'Roadmap generated successfully!' : 'تم إنشاء خارطة الطريق بنجاح!', 'success');
}

// Create roadmap chart
function createRoadmapChart() {
  const canvas = document.getElementById('roadmapChart');
  const ctx = canvas.getContext('2d');
  const lang = appState.currentLanguage;
  
  // Clear existing chart
  if (window.roadmapChart) {
    window.roadmapChart.destroy();
  }
  
  // Organize controls into phases
  const phases = organizeControlsIntoPhases();
  
  const datasets = [];
  const colors = ['#0066CC', '#28A745', '#FFA500', '#6F42C1', '#DC3545'];
  
  Object.keys(phases).forEach((phase, index) => {
    const phaseControls = phases[phase];
    datasets.push({
      label: lang === 'en' ? `Phase ${index + 1}` : `المرحلة ${index + 1}`,
      data: phaseControls.map(c => {
        const control = cisControls.find(ctrl => ctrl.id === c);
        return getSafeguardsCount(control);
      }),
      backgroundColor: colors[index],
      borderWidth: 0
    });
  });
  
  window.roadmapChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cisControls.map(c => lang === 'en' ? `Control ${c.id}` : `ضابط ${c.id}`),
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    }
  });
}

// Organize controls into implementation phases
function organizeControlsIntoPhases() {
  const profile = appState.organizationProfile;
  const priorityControls = profile ? (sectorPriorities[profile.sector] || []) : [];
  
  const phases = {
    phase1: [], // Quick wins: high priority, low effort
    phase2: [], // Foundation: IG1 controls
    phase3: [], // Enhancement: IG2 controls
    phase4: [], // Advanced: IG3 controls
    phase5: []  // Optimization: remaining
  };
  
  cisControls.forEach(control => {
    const status = appState.controlStatuses[control.id]?.status || 0;
    
    // Skip fully implemented
    if (status === 100) return;
    
    // Phase 1: Priority controls with low effort
    if (priorityControls.includes(control.id) && control.effort === 'Low') {
      phases.phase1.push(control.id);
    }
    // Phase 2: IG1 controls
    else if (control.ig1_safeguards > 0) {
      phases.phase2.push(control.id);
    }
    // Phase 3: IG2 controls
    else if (control.ig2_safeguards > 0) {
      phases.phase3.push(control.id);
    }
    // Phase 4: IG3 controls
    else if (control.ig3_safeguards > 0) {
      phases.phase4.push(control.id);
    }
    // Phase 5: Everything else
    else {
      phases.phase5.push(control.id);
    }
  });
  
  return phases;
}

// Toggle framework view
function toggleFrameworkView(e) {
  const viewType = e.currentTarget.dataset.viewType;
  
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.viewType === viewType);
  });
  
  if (viewType === 'matrix') {
    document.getElementById('frameworkMatrix').style.display = 'block';
    document.getElementById('frameworkRadar').style.display = 'none';
  } else {
    document.getElementById('frameworkMatrix').style.display = 'none';
    document.getElementById('frameworkRadar').style.display = 'block';
    createRadarChart();
  }
}

// Update framework mapping
function updateFrameworkMapping() {
  const selected = [];
  document.querySelectorAll('input[name="framework"]:checked').forEach(cb => {
    selected.push(cb.value);
  });
  
  appState.selectedFrameworks = selected;
  
  // Update matrix view
  createFrameworkMatrix();
  
  // Update radar if visible
  if (document.getElementById('frameworkRadar').style.display !== 'none') {
    createRadarChart();
  }
}

// Create framework mapping matrix
function createFrameworkMatrix() {
  const container = document.getElementById('frameworkMatrix');
  const lang = appState.currentLanguage;
  
  let html = '<table class="matrix-table">';
  html += '<thead><tr>';
  html += `<th>${lang === 'en' ? 'CIS Control' : 'ضابط CIS'}</th>`;
  
  appState.selectedFrameworks.forEach(fw => {
    html += `<th>${fw}</th>`;
  });
  
  html += '</tr></thead><tbody>';
  
  cisControls.forEach(control => {
    html += '<tr>';
    html += `<td><strong>${lang === 'en' ? control.title_en : control.title_ar}</strong></td>`;
    
    appState.selectedFrameworks.forEach(() => {
      // Simulated mapping (in real app, would use actual mapping data)
      const mapped = Math.random() > 0.3;
      const mappingClass = mapped ? 'mapped' : 'not-mapped';
      html += `<td><span class="mapping-indicator ${mappingClass}"></span></td>`;
    });
    
    html += '</tr>';
  });
  
  html += '</tbody></table>';
  container.innerHTML = html;
}

// Create radar chart for framework comparison
function createRadarChart() {
  const canvas = document.getElementById('radarChart');
  const ctx = canvas.getContext('2d');
  const lang = appState.currentLanguage;
  
  // Clear existing chart
  if (window.radarChart) {
    window.radarChart.destroy();
  }
  
  const labels = cisControls.slice(0, 8).map(c => lang === 'en' ? `C${c.id}` : `ض${c.id}`);
  const cisData = cisControls.slice(0, 8).map(c => appState.controlStatuses[c.id]?.status || 0);
  
  window.radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: 'CIS Controls',
        data: cisData,
        backgroundColor: 'rgba(0, 102, 204, 0.2)',
        borderColor: '#0066CC',
        pointBackgroundColor: '#0066CC',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

// Apply regional template
function applyTemplate(template) {
  const lang = appState.currentLanguage;
  let message = '';
  
  switch(template) {
    case 'kuwait-banking':
      document.querySelectorAll('input[name="framework"]').forEach(cb => {
        cb.checked = ['CBK', 'SWIFT', 'PCI-DSS'].includes(cb.value);
      });
      message = lang === 'en' ? 'Kuwait Banking template applied' : 'تم تطبيق قالب الخدمات المصرفية الكويتية';
      break;
    case 'saudi-financial':
      document.querySelectorAll('input[name="framework"]').forEach(cb => {
        cb.checked = ['SAMA', 'NCA'].includes(cb.value);
      });
      message = lang === 'en' ? 'Saudi Financial template applied' : 'تم تطبيق قالب المالية السعودية';
      break;
    case 'gcc-healthcare':
      document.querySelectorAll('input[name="framework"]').forEach(cb => {
        cb.checked = ['ISO27001'].includes(cb.value);
      });
      message = lang === 'en' ? 'GCC Healthcare template applied' : 'تم تطبيق قالب الرعاية الصحية الخليجية';
      break;
    case 'critical-infrastructure':
      document.querySelectorAll('input[name="framework"]').forEach(cb => {
        cb.checked = ['NIST', 'NCA'].includes(cb.value);
      });
      message = lang === 'en' ? 'Critical Infrastructure template applied' : 'تم تطبيق قالب البنية التحتية الحيوية';
      break;
  }
  
  updateFrameworkMapping();
  showToast(message, 'success');
}

// Generate report
function generateReport(reportType) {
  const lang = appState.currentLanguage;
  const modal = document.getElementById('reportModal');
  const modalBody = document.getElementById('modalBody');
  
  let reportHTML = '';
  
  switch(reportType) {
    case 'executive':
      reportHTML = generateExecutiveReport();
      break;
    case 'detailed':
      reportHTML = generateDetailedReport();
      break;
    case 'roadmap-report':
      reportHTML = generateRoadmapReport();
      break;
    case 'framework':
      reportHTML = generateFrameworkReport();
      break;
  }
  
  modalBody.innerHTML = reportHTML;
  modal.classList.add('active');
}

// Generate executive summary report
function generateExecutiveReport() {
  const lang = appState.currentLanguage;
  const overallScore = calculateOverallScore();
  const igScore = calculateIGScore();
  const priorityGaps = calculatePriorityGaps();
  const profile = appState.organizationProfile;
  
  let html = `
    <div style="padding: 20px;">
      <h1 style="color: #0066CC; margin-bottom: 20px;">${lang === 'en' ? 'Executive Summary Report' : 'تقرير الملخص التنفيذي'}</h1>
      
      ${profile ? `
        <div style="margin-bottom: 30px;">
          <h2>${lang === 'en' ? 'Organization Profile' : 'ملف المؤسسة'}</h2>
          <p><strong>${lang === 'en' ? 'Organization:' : 'المؤسسة:'}</strong> ${profile.name}</p>
          <p><strong>${lang === 'en' ? 'Target IG:' : 'المجموعة المستهدفة:'}</strong> ${profile.targetIG}</p>
          <p><strong>${lang === 'en' ? 'Assessment Date:' : 'تاريخ التقييم:'}</strong> ${new Date(appState.assessmentDate).toLocaleDateString()}</p>
        </div>
      ` : ''}
      
      <div style="margin-bottom: 30px;">
        <h2>${lang === 'en' ? 'Overall Compliance Status' : 'حالة الامتثال الإجمالية'}</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center;">
            <div style="font-size: 36px; font-weight: bold; color: ${overallScore < 50 ? '#DC3545' : '#28A745'};">${Math.round(overallScore)}%</div>
            <div>${lang === 'en' ? 'Overall Compliance' : 'الامتثال الإجمالي'}</div>
          </div>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center;">
            <div style="font-size: 36px; font-weight: bold; color: #0066CC;">${Math.round(igScore)}%</div>
            <div>${lang === 'en' ? 'IG Score' : 'درجة IG'}</div>
          </div>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center;">
            <div style="font-size: 36px; font-weight: bold; color: #FFA500;">${priorityGaps}</div>
            <div>${lang === 'en' ? 'Priority Gaps' : 'الفجوات ذات الأولوية'}</div>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2>${lang === 'en' ? 'Key Recommendations' : 'التوصيات الرئيسية'}</h2>
        <ol>
          <li>${lang === 'en' ? 'Focus on completing priority controls for your sector' : 'التركيز على إكمال الضوابط ذات الأولوية لقطاعك'}</li>
          <li>${lang === 'en' ? 'Implement IG1 controls as foundation' : 'تنفيذ ضوابط IG1 كأساس'}</li>
          <li>${lang === 'en' ? 'Establish continuous monitoring and improvement processes' : 'إنشاء عمليات المراقبة والتحسين المستمر'}</li>
          <li>${lang === 'en' ? 'Allocate resources for training and awareness' : 'تخصيص الموارد للتدريب والتوعية'}</li>
          <li>${lang === 'en' ? 'Regular assessment and progress tracking' : 'التقييم المنتظم وتتبع التقدم'}</li>
        </ol>
      </div>
    </div>
  `;
  
  return html;
}

// Generate detailed gap analysis report
function generateDetailedReport() {
  const lang = appState.currentLanguage;
  
  let html = `
    <div style="padding: 20px;">
      <h1 style="color: #0066CC; margin-bottom: 20px;">${lang === 'en' ? 'Detailed Gap Analysis Report' : 'تقرير تحليل الفجوات التفصيلي'}</h1>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">${lang === 'en' ? 'Control' : 'الضابط'}</th>
            <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">${lang === 'en' ? 'Status' : 'الحالة'}</th>
            <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">${lang === 'en' ? 'Priority' : 'الأولوية'}</th>
            <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">${lang === 'en' ? 'Notes' : 'ملاحظات'}</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  cisControls.forEach(control => {
    const status = appState.controlStatuses[control.id] || { status: 0, notes: '' };
    const statusText = getStatusText(status.status);
    const priority = calculatePriority(control.id);
    
    html += `
      <tr>
        <td style="padding: 12px; border: 1px solid #ddd;">${lang === 'en' ? control.title_en : control.title_ar}</td>
        <td style="padding: 12px; border: 1px solid #ddd;">${statusText} (${status.status}%)</td>
        <td style="padding: 12px; border: 1px solid #ddd;">${priority}</td>
        <td style="padding: 12px; border: 1px solid #ddd;">${status.notes || '-'}</td>
      </tr>
    `;
  });
  
  html += '</tbody></table></div>';
  return html;
}

// Generate roadmap report
function generateRoadmapReport() {
  const lang = appState.currentLanguage;
  const phases = organizeControlsIntoPhases();
  
  let html = `
    <div style="padding: 20px;">
      <h1 style="color: #0066CC; margin-bottom: 20px;">${lang === 'en' ? 'Implementation Roadmap Report' : 'تقرير خارطة طريق التنفيذ'}</h1>
  `;
  
  Object.keys(phases).forEach((phase, index) => {
    const phaseControls = phases[phase];
    if (phaseControls.length === 0) return;
    
    html += `
      <div style="margin-bottom: 30px;">
        <h2>Phase ${index + 1}: ${getPhaseNameForIndex(index, lang)}</h2>
        <ul>
    `;
    
    phaseControls.forEach(controlId => {
      const control = cisControls.find(c => c.id === controlId);
      html += `<li>${lang === 'en' ? control.title_en : control.title_ar}</li>`;
    });
    
    html += '</ul></div>';
  });
  
  html += '</div>';
  return html;
}

// Get phase name for index
function getPhaseNameForIndex(index, lang) {
  const phases_en = ['Quick Wins', 'Foundation', 'Enhancement', 'Advanced', 'Optimization'];
  const phases_ar = ['الانتصارات السريعة', 'الأساس', 'التحسين', 'المتقدم', 'التحسين المستمر'];
  return lang === 'en' ? phases_en[index] : phases_ar[index];
}

// Generate framework compliance report
function generateFrameworkReport() {
  const lang = appState.currentLanguage;
  
  let html = `
    <div style="padding: 20px;">
      <h1 style="color: #0066CC; margin-bottom: 20px;">${lang === 'en' ? 'Framework Compliance Report' : 'تقرير امتثال الأطر'}</h1>
      <p>${lang === 'en' ? 'Selected Frameworks:' : 'الأطر المحددة:'} ${appState.selectedFrameworks.join(', ')}</p>
      <p style="margin-top: 20px;">${lang === 'en' ? 'This report shows how your CIS Controls implementation maps to the selected frameworks. By implementing CIS Controls, you are building a strong foundation that satisfies requirements across multiple compliance frameworks.' : 'يوضح هذا التقرير كيفية ربط تنفيذ ضوابط CIS الخاصة بك بالأطر المحددة. من خلال تنفيذ ضوابط CIS، فإنك تبني أساسًا قويًا يلبي المتطلبات عبر أطر امتثال متعددة.'}</p>
    </div>
  `;
  
  return html;
}

// Close modal
function closeModal() {
  document.getElementById('reportModal').classList.remove('active');
}

// Export to JSON
function exportJSON() {
  const data = {
    profile: appState.organizationProfile,
    controlStatuses: appState.controlStatuses,
    assessmentDate: appState.assessmentDate,
    roadmapConfig: appState.roadmapConfig,
    selectedFrameworks: appState.selectedFrameworks
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cis-assessment-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  showToast(appState.currentLanguage === 'en' ? 'Assessment exported successfully!' : 'تم تصدير التقييم بنجاح!', 'success');
}

// Export to Excel (CSV)
function exportExcel() {
  const lang = appState.currentLanguage;
  let csv = lang === 'en' ? 'Control ID,Control Name,Status,Priority,Effort,Notes\n' : 'معرف الضابط,اسم الضابط,الحالة,الأولوية,الجهد,ملاحظات\n';
  
  cisControls.forEach(control => {
    const status = appState.controlStatuses[control.id] || { status: 0, notes: '' };
    const priority = calculatePriority(control.id);
    const title = lang === 'en' ? control.title_en : control.title_ar;
    
    csv += `${control.id},"${title}",${status.status}%,${priority},${control.effort},"${status.notes || ''}"\n`;
  });
  
  const csvBlob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(csvBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cis-assessment-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  showToast(appState.currentLanguage === 'en' ? 'Assessment exported to CSV!' : 'تم تصدير التقييم إلى CSV!', 'success');
}

// Import from JSON
function importJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      
      if (data.profile) appState.organizationProfile = data.profile;
      if (data.controlStatuses) appState.controlStatuses = data.controlStatuses;
      if (data.assessmentDate) appState.assessmentDate = data.assessmentDate;
      if (data.roadmapConfig) appState.roadmapConfig = data.roadmapConfig;
      if (data.selectedFrameworks) appState.selectedFrameworks = data.selectedFrameworks;
      
      renderControlsList();
      updateDashboard();
      
      showToast(appState.currentLanguage === 'en' ? 'Assessment imported successfully!' : 'تم استيراد التقييم بنجاح!', 'success');
    } catch (error) {
      showToast(appState.currentLanguage === 'en' ? 'Error importing file' : 'خطأ في استيراد الملف', 'error');
    }
  };
  
  reader.readAsText(file);
  e.target.value = ''; // Reset file input
}

// Save to browser (in-memory storage)
function saveToBrowser() {
  // Store in a global variable since localStorage is not available
  window.cisAssessmentData = {
    profile: appState.organizationProfile,
    controlStatuses: appState.controlStatuses,
    assessmentDate: appState.assessmentDate,
    roadmapConfig: appState.roadmapConfig,
    selectedFrameworks: appState.selectedFrameworks,
    savedAt: new Date().toISOString()
  };
  
  showToast(appState.currentLanguage === 'en' ? 'Assessment saved to memory!' : 'تم حفظ التقييم في الذاكرة!', 'success');
}

// Load from browser (in-memory storage)
function loadFromBrowser() {
  if (window.cisAssessmentData) {
    const data = window.cisAssessmentData;
    
    if (data.profile) appState.organizationProfile = data.profile;
    if (data.controlStatuses) appState.controlStatuses = data.controlStatuses;
    if (data.assessmentDate) appState.assessmentDate = data.assessmentDate;
    if (data.roadmapConfig) appState.roadmapConfig = data.roadmapConfig;
    if (data.selectedFrameworks) appState.selectedFrameworks = data.selectedFrameworks;
    
    renderControlsList();
    updateDashboard();
    
    showToast(appState.currentLanguage === 'en' ? 'Assessment loaded successfully!' : 'تم تحميل التقييم بنجاح!', 'success');
  } else {
    showToast(appState.currentLanguage === 'en' ? 'No saved assessment found' : 'لم يتم العثور على تقييم محفوظ', 'warning');
  }
}

// Clear all data
function clearAllData() {
  const lang = appState.currentLanguage;
  const confirmed = confirm(lang === 'en' ? 'Are you sure you want to clear all data?' : 'هل أنت متأكد من رغبتك في مسح جميع البيانات؟');
  
  if (confirmed) {
    appState.organizationProfile = null;
    appState.controlStatuses = {};
    appState.assessmentDate = null;
    appState.roadmapConfig = null;
    window.cisAssessmentData = null;
    
    renderControlsList();
    updateDashboard();
    
    showToast(lang === 'en' ? 'All data cleared!' : 'تم مسح جميع البيانات!', 'success');
  }
}

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
