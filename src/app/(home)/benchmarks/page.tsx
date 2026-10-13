import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import {
  blanks,
  formatMs,
  frameworks,
  groups,
  memory,
  notes,
  results,
  rowNotes,
  run,
  splitScenario,
  toolkitApiRows,
  verdict,
  winCounts,
} from '@/lib/benchmarks';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Benchmarks',
  description:
    'Source2Toolkit, CounterStrikeSharp, SwiftlyS2 and ModSharp running the same profiler scenarios on one CS2 server.',
};

const profilerRepo = 'https://github.com/swiftly-solution/profiler';

function NoteMark({ n }: { n: number }) {
  return <sup className="ml-0.5 font-mono text-[10px] text-ember">{n}</sup>;
}

export default function BenchmarksPage() {
  const { wins, compared } = winCounts();
  const mostWins = Math.max(...Object.values(wins));

  return (
    <main className="flex flex-1 flex-col">
      {/* ------------------------------------------------------------ header */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-6xl border-fd-border px-6 py-16 md:border-x md:py-20">
          <p className="s2-eyebrow text-ember">Benchmarks · {run.date}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl">
            The same profiler, four frameworks, one server
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fd-muted-foreground">
            CounterStrikeSharp, Source2Toolkit, SwiftlyS2 and ModSharp each ran the
            scenarios of the Swiftly team&apos;s framework profiler alone on the same
            Linux dedicated server, with the same bots. Every value is the time one
            sample of the scenario took.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px border border-fd-border bg-fd-border sm:grid-cols-4">
            {[
              { label: 'Game build', value: run.build },
              { label: 'Map', value: run.map },
              { label: 'Bots', value: String(run.bots) },
              { label: 'Test', value: `${run.seconds} s per framework` },
            ].map((spec) => (
              <div key={spec.label} className="bg-fd-background px-4 py-3">
                <dt className="s2-eyebrow text-fd-muted-foreground">{spec.label}</dt>
                <dd className="mt-1.5 text-sm font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -------------------------------------------------------------- wins */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-6xl border-fd-border px-6 py-14 md:border-x">
          <p className="s2-eyebrow text-ember">Fastest per scenario</p>
          <div className="mt-6 grid gap-px border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-4">
            {frameworks.map((f) => (
              <div key={f.key} className="relative bg-fd-background p-6">
                {wins[f.key] === mostWins && (
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-ember" aria-hidden />
                )}
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="s2-eyebrow mt-1 text-fd-muted-foreground">{f.version}</p>
                <p
                  className={cn(
                    'mt-5 font-mono text-4xl tabular-nums',
                    wins[f.key] === mostWins ? 'text-ember' : 'text-fd-foreground',
                  )}
                >
                  {wins[f.key]}
                </p>
                <p className="mt-1 text-sm text-fd-muted-foreground">of {compared} compared scenarios</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- results */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-6xl border-fd-border px-6 py-14 md:border-x">
          <p className="s2-eyebrow text-ember">Results</p>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Average per sample</h2>
          <p className="mt-3 max-w-2xl text-fd-muted-foreground">
            Min and max below each average. Green is the fastest average in the row,
            red the slowest. The profilers time in microseconds, so anything under
            1&nbsp;µs reads as &lt;1&nbsp;µs.
          </p>

          <div className="mt-8 overflow-x-auto border border-fd-border">
            <table className="w-full min-w-[880px] border-collapse text-sm tabular-nums">
              <thead>
                <tr className="border-b border-fd-border bg-fd-muted/40">
                  <th scope="col" className="px-4 py-3 text-left font-semibold">
                    Scenario
                  </th>
                  {frameworks.map((f) => (
                    <th key={f.key} scope="col" className="px-4 py-3 text-right font-semibold">
                      {f.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <GroupRows key={group.title} title={group.title} scenarios={group.scenarios} />
                ))}
              </tbody>
            </table>
          </div>

          <ol className="mt-6 grid gap-2 text-sm text-fd-muted-foreground">
            {notes.map((note, i) => (
              <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-1">
                <span className="font-mono text-xs text-ember">{i + 1}</span>
                <span className="max-w-3xl">{note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------ memory */}
      <section className="border-b border-fd-border">
        <div className="mx-auto max-w-6xl border-fd-border px-6 py-14 md:border-x">
          <p className="s2-eyebrow text-ember">Memory</p>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">What stays after the test</h2>
          <p className="mt-3 max-w-2xl text-fd-muted-foreground">
            Resident memory of the whole server process before the test, at its end
            and 30&nbsp;s after <code>endtest</code>, and the managed heap the C#
            profilers report. Source2Toolkit has no garbage-collected heap.
          </p>

          <div className="mt-8 overflow-x-auto border border-fd-border">
            <table className="w-full min-w-[720px] border-collapse text-sm tabular-nums">
              <thead>
                <tr className="border-b border-fd-border bg-fd-muted/40">
                  {['Framework', 'RSS before', 'RSS end of test', 'RSS +30 s', 'Kept after test', 'Managed heap before / after / after GC'].map(
                    (h, i) => (
                      <th key={h} scope="col" className={cn('px-4 py-3 font-semibold', i === 0 ? 'text-left' : 'text-right')}>
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {memory.map((m) => {
                  const kept = m.after - m.before;
                  const name = frameworks.find((f) => f.key === m.key)!.name;
                  return (
                    <tr key={m.key} className="border-b border-fd-border last:border-0">
                      <th scope="row" className="px-4 py-3 text-left font-medium">
                        {name}
                      </th>
                      <td className="px-4 py-3 text-right font-mono">{m.before.toFixed(1)} MB</td>
                      <td className="px-4 py-3 text-right font-mono">{m.end.toFixed(1)} MB</td>
                      <td className="px-4 py-3 text-right font-mono">{m.after.toFixed(1)} MB</td>
                      <td
                        className={cn(
                          'px-4 py-3 text-right font-mono',
                          kept > 5 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400',
                        )}
                      >
                        {kept > 0 ? '+' : ''}
                        {kept.toFixed(1)} MB
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-fd-muted-foreground">
                        {m.heap ? `${m.heap.map((v) => v.toFixed(1)).join(' / ')} MB` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- toolkit api + method */}
      <section className="border-b border-fd-border">
        <div className="mx-auto grid max-w-6xl gap-12 border-fd-border px-6 py-14 md:border-x lg:grid-cols-2">
          <div className="min-w-0">
            <p className="s2-eyebrow text-ember">Toolkit API rows</p>
            <p className="mt-4 text-fd-muted-foreground">
              The ConVar rows above use direct access, as the other frameworks&apos;
              getters and setters do. Through <code>g_pToolkitConVars</code> the same
              writes go through the engine&apos;s setter, which runs change callbacks
              and replicates every write to all clients.
            </p>
            <div className="mt-6 overflow-x-auto border border-fd-border">
              <table className="w-full border-collapse text-sm tabular-nums">
                <tbody>
                  {toolkitApiRows.map(({ scenario, sample }) => {
                    const [title, sub] = splitScenario(scenario);
                    return (
                      <tr key={scenario} className="border-b border-fd-border last:border-0">
                        <th scope="row" className="px-4 py-3 text-left font-medium">
                          {title}
                          <span className="block text-xs font-normal text-fd-muted-foreground">{sub}</span>
                        </th>
                        <td className="px-4 py-3 text-right font-mono">
                          {formatMs(sample.avg)}
                          <span className="block text-xs text-fd-muted-foreground">
                            {formatMs(sample.min)} – {formatMs(sample.max)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="min-w-0">
            <p className="s2-eyebrow text-ember">Method</p>
            <div className="mt-4 grid gap-4 text-fd-muted-foreground">
              <p>
                Each framework ran alone: its own loader, its own profiler, no other
                plugins, the server&apos;s addons and gameinfo.gi restored between runs.
                Bots were added over RCON the same way every time; a vanilla
                competitive server takes 10 per team. Then <code>starttest</code>,{' '}
                {run.seconds}&nbsp;s of ticks, <code>endtest</code> and <code>savetest</code>.
              </p>
              <p>
                The CounterStrikeSharp, SwiftlyS2 and ModSharp profilers are the
                reference ones from{' '}
                <a href={profilerRepo} className="text-ember underline-offset-4 hover:underline">
                  swiftly-solution/profiler
                </a>
                , built unchanged except for the framework package versions. The
                Source2Toolkit profiler is an independent C++ implementation of the
                same scenarios.
              </p>
              <p className="text-sm">
                Scenarios, sizes, names and trace format by the Swiftly Development
                Team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function GroupRows({ title, scenarios }: { title: string; scenarios: string[] }) {
  return (
    <>
      <tr className="border-b border-fd-border bg-fd-muted/40">
        <td colSpan={frameworks.length + 1} className="s2-eyebrow px-4 py-2 text-fd-muted-foreground">
          {title}
        </td>
      </tr>
      {scenarios.map((scenario) => {
        const row = results[scenario] ?? {};
        const blank = blanks[scenario] ?? {};
        const v = verdict(scenario);
        const [name, sub] = splitScenario(scenario);
        return (
          <tr key={scenario} className="border-b border-fd-border last:border-0">
            <th scope="row" className="min-w-64 px-4 py-3 text-left align-top font-medium">
              {name}
              {rowNotes[scenario] && <NoteMark n={rowNotes[scenario]} />}
              {sub && <span className="block text-xs font-normal text-fd-muted-foreground">{sub}</span>}
            </th>
            {frameworks.map((f) => {
              const b = blank[f.key];
              const s = row[f.key];
              if (b || !s) {
                return (
                  <td key={f.key} className="px-4 py-3 text-right align-top text-xs text-fd-muted-foreground">
                    {b ? b.text : 'N/A'}
                    {b && <NoteMark n={b.note} />}
                  </td>
                );
              }
              const best = !v.tie && s.avg === v.best;
              const worst = !v.tie && s.avg === v.worst;
              return (
                <td
                  key={f.key}
                  className={cn(
                    'whitespace-nowrap px-4 py-3 text-right align-top font-mono',
                    best && 'bg-emerald-500/10',
                    worst && 'bg-red-500/10',
                  )}
                >
                  <span
                    className={cn(
                      best && 'font-semibold text-emerald-700 dark:text-emerald-400',
                      worst && 'text-red-700 dark:text-red-400',
                    )}
                  >
                    {formatMs(s.avg)}
                  </span>
                  <span className="block text-xs text-fd-muted-foreground">
                    {formatMs(s.min)} – {formatMs(s.max)} · {s.count.toLocaleString('en-US')}×
                  </span>
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}
