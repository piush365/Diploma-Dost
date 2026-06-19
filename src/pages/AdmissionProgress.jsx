export default function AdmissionProgress() {
  const admissionSteps = [
    {
      title: "MSBTE Result Declared",
      status: "current",
      date: "18 Jun 2026",
      link: "https://result.msbte.ac.in/pcwebBTRes/pcResult01/pcfrmViewMSBTEResult.aspx"
    },
    { title: "Admission Registration", status: "upcoming" },
    { title: "Document Verification", status: "upcoming" },
    { title: "Provisional Merit List", status: "upcoming" },
    { title: "Merit List Corrections", status: "upcoming" },
    { title: "Final Merit List", status: "upcoming" },

    { title: "CAP Round 1 - Seat Matrix", status: "upcoming" },
    { title: "CAP Round 1 - Option Form", status: "upcoming" },
    { title: "CAP Round 1 - Allotment", status: "upcoming" },
    { title: "CAP Round 1 - Admission Confirmation", status: "upcoming" },

    { title: "CAP Round 2 - Vacant Seats", status: "upcoming" },
    { title: "CAP Round 2 - Option Form", status: "upcoming" },
    { title: "CAP Round 2 - Allotment", status: "upcoming" },
    { title: "CAP Round 2 - Admission Confirmation", status: "upcoming" },

    { title: "CAP Round 3 - Vacant Seats", status: "upcoming" },
    { title: "CAP Round 3 - Option Form", status: "upcoming" },
    { title: "CAP Round 3 - Allotment", status: "upcoming" },
    { title: "CAP Round 3 - Admission Confirmation", status: "upcoming" },

    { title: "CAP Round 4 - Vacant Seats", status: "upcoming" },
    { title: "CAP Round 4 - Option Form", status: "upcoming" },
    { title: "CAP Round 4 - Allotment", status: "upcoming" },
    { title: "CAP Round 4 - Admission Confirmation", status: "upcoming" },

    { title: "Institute Level Applications", status: "upcoming" },
    { title: "Institute Level Admissions", status: "upcoming" },
    { title: "Vacant Seat Admissions", status: "upcoming" },
    { title: "Admission Closed", status: "upcoming" }
  ];

  const currentStep = admissionSteps.find(
    (step) => step.status === "current"
  );

  const completedCount = admissionSteps.filter(
    (step) => step.status === "completed"
  ).length;

  const progress = Math.round(
    ((completedCount + 1) / admissionSteps.length) * 100
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Admission Progress
        </h1>

        <p className="text-gray-400 text-lg">
          Live updates for Diploma to Degree admissions.
        </p>
      </div>

      {/* Current Update */}
      <div className="bg-zinc-900 border border-green-500/30 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-green-400 font-semibold">
            CURRENT UPDATE
          </span>
        </div>

        <h2 className="text-2xl font-bold">
          {currentStep?.title}
        </h2>

        <p className="text-gray-400 mt-2">
          MSBTE Summer 2026 Result has been declared. Admission registration
          schedule is yet to be announced.
        </p>

        <a
          href={currentStep?.link}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-lg font-medium"
        >
          Check Result
        </a>
      </div>

      {/* Progress */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
        <div className="flex justify-between mb-3">
          <span className="font-semibold">
            Admission Journey Progress
          </span>

          <span className="text-green-400 font-bold">
            {progress}%
          </span>
        </div>

        <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Admission Timeline
        </h2>

        <div className="space-y-4">
          {admissionSteps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-xl border ${
                step.status === "completed"
                  ? "border-red-500/30 bg-red-500/10"
                  : step.status === "current"
                  ? "border-green-500/30 bg-green-500/10"
                  : "border-zinc-700 bg-zinc-800/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-4 w-4 rounded-full ${
                    step.status === "completed"
                      ? "bg-red-500"
                      : step.status === "current"
                      ? "bg-green-500"
                      : "bg-zinc-600"
                  }`}
                />

                <div>
                  <h3 className="font-medium">
                    {step.title}
                  </h3>

                  {step.date && (
                    <p className="text-sm text-gray-400">
                      {step.date}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 md:mt-0">
                {step.status === "completed" && (
                  <span className="text-red-400 text-sm font-semibold">
                    Completed
                  </span>
                )}

                {step.status === "current" && (
                  <span className="text-green-400 text-sm font-semibold">
                    Current
                  </span>
                )}

                {step.status === "upcoming" && (
                  <span className="text-gray-400 text-sm">
                    Upcoming
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-gray-300">Completed</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-gray-300">Current</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-zinc-500"></div>
          <span className="text-gray-300">Upcoming</span>
        </div>
      </div>

      {/* Note */}
      <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
        <p className="text-yellow-300">
          ⚠️ As of now, only the MSBTE Result (18 June 2026) has been declared.
          Admission registration and CAP round dates are yet to be announced by
          the CET Cell.
        </p>
      </div>
    </div>
  );
}