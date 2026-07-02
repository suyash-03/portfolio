import { useState, useEffect, useRef } from 'react';
import { Box, Container, Card, CardContent, Typography, Button, Stack, FormControlLabel, Switch, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, AlertTriangle, Sliders, Activity, Brain } from 'lucide-react';
import SectionTitle from './SectionTitle';

const gradient = 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)';
const accentGradient = 'linear-gradient(135deg, #f43f5e 0%, #a855f7 100%)';

const SummitSimulator = () => {
  // Config states
  const [hardware, setHardware] = useState('SSD Gen5 NVMe');
  const [branch, setBranch] = useState('feature/rca-agent');
  const [suite, setSuite] = useState('Nightly Validation Suite');
  const [injectError, setInjectError] = useState(true);

  // Simulation runner states
  const [simStatus, setSimStatus] = useState('idle'); // idle, running, success, failed
  const [logs, setLogs] = useState([]);

  // AI RCA states
  const [rcaStatus, setRcaStatus] = useState('idle'); // idle, analyzing, diagnosed
  const [rcaDiagnosis, setRcaDiagnosis] = useState(null);

  // Fluctuating metric states
  const [activeNodes, setActiveNodes] = useState(42);
  const [queueSize, setQueueSize] = useState(2100);
  const [p95Latency, setP95Latency] = useState(24);
  const [aiConfidence, setAiConfidence] = useState(98);

  const terminalContainerRef = useRef(null);

  // Auto scroll logs container only (not the webpage viewport)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate metrics fluctuating slightly
  useEffect(() => {
    const interval = setInterval(() => {
      if (simStatus === 'running') {
        setActiveNodes(prev => Math.min(64, Math.max(38, prev + Math.floor(Math.random() * 5) - 2)));
        setQueueSize(prev => Math.max(100, prev + Math.floor(Math.random() * 400) - 200));
        setP95Latency(prev => Math.max(15, Math.min(45, prev + Math.floor(Math.random() * 4) - 2)));
      } else {
        setActiveNodes(42);
        setQueueSize(0);
        setP95Latency(21);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [simStatus]);

  const runSimulation = () => {
    setSimStatus('running');
    setRcaStatus('idle');
    setRcaDiagnosis(null);
    setLogs([]);
    setQueueSize(1850);

    const simulationSteps = [
      `[INFO] [Orchestrator] Initiating test run trigger...`,
      `[INFO] [Scheduler] Checking cluster capacity. Active nodes: ${activeNodes}/64`,
      `[INFO] [Git] Cloning target repository. Branch: [${branch}]`,
      `[INFO] [Git] Target SHA: 8a9df32b (latest commit)`,
      `[INFO] [ImageService] Fetching firmware target image for hardware platform: [${hardware}]`,
      `[INFO] [Runner] Allocating target test board sled... Sled #14 reserved`,
      `[INFO] [Orchestrator] Mounting image and flashing target firmware... Flashing 100%`,
      `[INFO] [Executor] Starting workflow stage: [CI/CD Validation Checks]`,
      `[SUCCESS] Stage [CI/CD Validation Checks] completed successfully.`,
      `[INFO] [Executor] Starting workflow stage: [${suite}]`,
      `[INFO] [SuiteRunner] Launching test framework pipeline on hardware test harness...`,
      `[DEBUG] [Harness-14] Verifying controller read/write bounds...`,
      `[DEBUG] [Harness-14] Running block allocation stress test loop (1/5)...`,
      `[DEBUG] [Harness-14] Running block allocation stress test loop (2/5)...`,
      `[DEBUG] [Harness-14] Running block allocation stress test loop (3/5)...`,
    ];

    let index = 0;
    const intervalTime = 300;

    const printNextLog = () => {
      if (index < simulationSteps.length) {
        setLogs(prev => [...prev, simulationSteps[index]]);
        index++;
        setTimeout(printNextLog, intervalTime);
      } else {
        // Run either succeeds or fails based on checkbox
        if (injectError) {
          setLogs(prev => [
            ...prev,
            `[ERROR] [Harness-14] Direct memory write assertion failure on hardware index [0xAA55]`,
            `[ERROR] [Harness-14] Readback verification mismatch: Expected [0xAA55], Received [0xAA50]`,
            `[FATAL] [Orchestrator] Execution halted. Test run failed in stage [${suite}].`
          ]);
          setSimStatus('failed');
        } else {
          setLogs(prev => [
            ...prev,
            `[DEBUG] [Harness-14] Running block allocation stress test loop (4/5)...`,
            `[DEBUG] [Harness-14] Running block allocation stress test loop (5/5)...`,
            `[INFO] [SuiteRunner] Collecting telemetry logs and core dump buffers...`,
            `[SUCCESS] Stage [${suite}] completed with 0 errors.`,
            `[INFO] [Orchestrator] Test execution pipeline finished successfully.`,
            `[SUCCESS] Test run status: SUCCESS. Sled freed.`
          ]);
          setSimStatus('success');
        }
      }
    };

    printNextLog();
  };

  const runAiRca = () => {
    setRcaStatus('analyzing');
    setAiConfidence(50);

    // Fluctuate AI confidence upward during analysis
    const confInterval = setInterval(() => {
      setAiConfidence(prev => Math.min(99, prev + Math.floor(Math.random() * 15)));
    }, 400);

    setTimeout(() => {
      clearInterval(confInterval);
      setAiConfidence(98);
      setRcaStatus('diagnosed');

      // Generate realistic diagnosis based on selected hardware
      if (hardware === 'SSD Gen5 NVMe') {
        setRcaDiagnosis({
          type: 'Firmware Bug',
          confidence: '98%',
          summary: 'NVMe controller DMA page-boundary overflow at memory location [0xAA50].',
          details: 'The block allocation loop triggered a boundary alignment exception in the NVMe write path. A buffer overlap corrupted the validation checksum from [0xAA55] to [0xAA50].',
          action: 'Modify boundary alignment check logic in `nvme_pcie_dma.c` at line 142.'
        });
      } else if (hardware === 'Micron NAND LPDDR5') {
        setRcaDiagnosis({
          type: 'Validation Test Error',
          confidence: '94%',
          summary: 'Harness validation driver timed out while reading the LPDDR5 refresh registers.',
          details: 'The test logic attempted to capture register metadata before the LPDDR5 training cycle fully stabilized. This resulted in reading stale training buffer flags.',
          action: 'Increase settling delay parameter in `lpddr5_verify_harness.py` from 50ms to 120ms.'
        });
      } else {
        setRcaDiagnosis({
          type: 'Infrastructure / Orchestrator Failure',
          confidence: '96%',
          summary: 'Summit executor node lost heartbeat telemetry connection to hardware target Sled-14.',
          details: 'A network socket timeout occurred in the pipeline manager layer during log buffering. The underlying hardware finished executing, but reports could not be collected.',
          action: 'Inspect host networking node and Docker runner daemon socket resource limits.'
        });
      }
    }, 2000);
  };

  return (
    <Box component="section" id="summit" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionTitle number="02.">Summit Sandbox</SectionTitle>
        <Typography color="text.secondary" sx={{ fontSize: '1.1rem', mb: 6, textAlign: 'center', maxWidth: 750, mx: 'auto', lineHeight: 1.7 }}>
          At Micron, my team scales <strong>Summit</strong>, a distributed hardware-in-the-loop test orchestration platform. Try this simulation to configure a test run, execute firmware test suites, and trigger the AI-driven Root Cause Analysis (RCA) engine on simulated target faults.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1.3fr' },
            gap: 4,
            alignItems: 'stretch'
          }}
        >
          {/* Left panel: Control center configuration */}
          <Card className="bento-card summit-sim-card" sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                  <Sliders size={20} color="#06b6d4" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Orchestrator Config</Typography>
                </Stack>

                <Stack spacing={3}>
                  <Box>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'primary.light', display: 'block', mb: 1 }}>
                      TARGET HARDWARE PLATFORM
                    </Typography>
                    <select
                      className="summit-input-select"
                      value={hardware}
                      onChange={(e) => setHardware(e.target.value)}
                      disabled={simStatus === 'running'}
                    >
                      <option value="SSD Gen5 NVMe">Micron SSD Gen5 NVMe</option>
                      <option value="Micron NAND LPDDR5">Micron NAND LPDDR5</option>
                      <option value="NorFlash Edge Device">Micron NorFlash Edge Device</option>
                    </select>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'primary.light', display: 'block', mb: 1 }}>
                      FIRMWARE REPOSITORY BRANCH
                    </Typography>
                    <select
                      className="summit-input-select"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      disabled={simStatus === 'running'}
                    >
                      <option value="main">main (production release)</option>
                      <option value="release/v4.2">release/v4.2 (weekly stable)</option>
                      <option value="feature/rca-agent">feature/rca-agent (active PR)</option>
                      <option value="hotfix/bootloader">hotfix/bootloader (expedited patches)</option>
                    </select>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'primary.light', display: 'block', mb: 1 }}>
                      TEST SUITE WORKFLOW
                    </Typography>
                    <select
                      className="summit-input-select"
                      value={suite}
                      onChange={(e) => setSuite(e.target.value)}
                      disabled={simStatus === 'running'}
                    >
                      <option value="CI/CD Static Analysis & PR Checks">CI/CD PR Unit Checks</option>
                      <option value="Nightly Validation Suite">Nightly Validation Suite</option>
                      <option value="Weekly Release Validation">Weekly Release Validation</option>
                    </select>
                  </Box>

                  <Box sx={{ pt: 1 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={injectError}
                          onChange={(e) => setInjectError(e.target.checked)}
                          disabled={simStatus === 'running'}
                          color="error"
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ fontWeight: 500, color: injectError ? '#f43f5e' : 'text.secondary' }}>
                          Inject hardware register fault (Simulate failure)
                        </Typography>
                      }
                    />
                  </Box>
                </Stack>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={runSimulation}
                  disabled={simStatus === 'running'}
                  startIcon={simStatus === 'running' ? <CircularProgress size={16} color="inherit" /> : <Play size={16} />}
                  sx={{
                    background: simStatus === 'running' ? 'rgba(255,255,255,0.08)' : gradient,
                    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.25)',
                    py: 1.5,
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(6, 182, 212, 0.4)'
                    }
                  }}
                >
                  {simStatus === 'running' ? 'RUNNING TEST PIPELINE...' : 'TRIGGER TEST RUN PIPELINE'}
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Right panel: Terminal logs, system metrics & AI RCA output */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Terminal logs display */}
            <Card className="terminal-window" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box className="terminal-header">
                <Box className="terminal-dots">
                  <div className="dot red" />
                  <div className="dot yellow" />
                  <div className="dot green" />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', opacity: 0.7 }}>
                  summit-orchestrator-console
                </Typography>
              </Box>

              <Box ref={terminalContainerRef} className="terminal-content" sx={{ height: 260, bgcolor: '#020204', p: 2, overflowY: 'auto' }}>
                {logs.length === 0 && (
                  <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      System idle. Click Trigger Test Run to begin telemetry feed...
                    </Typography>
                  </Box>
                )}
                {logs.map((log, idx) => (
                  log && typeof log === 'string' && (
                    <div
                      key={idx}
                      style={{
                        color: log.includes('[ERROR]') || log.includes('[FATAL]') ? '#f43f5e' :
                               log.includes('[SUCCESS]') ? '#10b981' :
                               log.includes('[DEBUG]') ? '#94a3b8' : '#e2e8f0',
                        marginBottom: '6px',
                        fontFamily: 'monospace'
                      }}
                    >
                      {log}
                    </div>
                  )
                ))}
              </Box>

              {/* Fluctuating metrics bar */}
              <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(0,0,0,0.3)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                <Box className="metric-node">
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.65rem' }}>
                    ACTIVE HW SLEDS
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: '#06b6d4', mt: 0.5 }}>
                    {simStatus === 'running' ? `${activeNodes} / 64` : '42 / 64'}
                  </Typography>
                </Box>
                <Box className="metric-node">
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.65rem' }}>
                    KAFKA STREAM INGESTION
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: '#6366f1', mt: 0.5 }}>
                    {simStatus === 'running' ? `${queueSize} msg/s` : '0 msg/s'}
                  </Typography>
                </Box>
                <Box className="metric-node">
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.65rem' }}>
                    P95 RUNTIME LATENCY
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: '#10b981', mt: 0.5 }}>
                    {simStatus === 'running' ? `${p95Latency} ms` : '21 ms'}
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* AI RCA Output Panel */}
            <Card
              className={`ai-rca-panel ${simStatus === 'failed' ? 'error-active' : ''} ${rcaStatus === 'diagnosed' ? 'analyzed' : ''}`}
              sx={{ p: 3, border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {rcaStatus === 'analyzing' && <div className="ai-scan-glow" />}

              <AnimatePresence mode="wait">
                {simStatus === 'idle' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ opacity: 0.6 }}>
                      <Brain size={28} color="#94a3b8" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>RCA Agent Telemetry</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Run a failing test suite to trigger AI Root Cause Analysis.</Typography>
                      </Box>
                    </Stack>
                  </motion.div>
                )}

                {simStatus === 'success' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <CheckCircle size={28} color="#10b981" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#10b981' }}>Pipeline execution succeeded</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>No hardware telemetry error codes found. AI diagnostic search skipped.</Typography>
                      </Box>
                    </Stack>
                  </motion.div>
                )}

                {simStatus === 'running' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ opacity: 0.8 }}>
                      <Activity size={24} style={{ color: '#06b6d4' }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Monitoring execution telemetry...</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Awaiting pipeline completion. Event triggers bound to Kafka log brokers.</Typography>
                      </Box>
                    </Stack>
                  </motion.div>
                )}

                {simStatus === 'failed' && rcaStatus === 'idle' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <AlertTriangle size={32} color="#f43f5e" />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#f43f5e' }}>FAULT DETECTED: Execution Aborted</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Hardware harness caught assertion fail. Logs indexed.</Typography>
                        </Box>
                      </Stack>
                      <Button
                        variant="contained"
                        className="pulsing-rca-btn"
                        onClick={runAiRca}
                        startIcon={<Brain size={16} />}
                        sx={{
                          background: accentGradient,
                          px: 3,
                          py: 1,
                          fontSize: '0.8rem',
                          fontFamily: 'monospace'
                        }}
                      >
                        RUN AI RCA
                      </Button>
                    </Stack>
                  </motion.div>
                )}

                {rcaStatus === 'analyzing' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <CircularProgress size={24} color="secondary" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#818cf8' }}>AI AGENT: SCANNING LOG STREAMS & CALLSTACKS</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                          Analyzing AST dump... Matching telemetry logs (Confidence: {aiConfidence}%)
                        </Typography>
                      </Box>
                    </Stack>
                  </motion.div>
                )}

                {rcaStatus === 'diagnosed' && rcaDiagnosis && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ width: '100%' }}>
                    <Box sx={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)', pb: 1.5, mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Brain size={22} color="#818cf8" />
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#818cf8', textTransform: 'uppercase' }}>
                          RCA Agent Diagnosis: {rcaDiagnosis.type}
                        </Typography>
                      </Stack>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#10b981', bgcolor: 'rgba(16, 185, 129, 0.08)', px: 1.5, py: 0.5, borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        CONFIDENCE: {rcaDiagnosis.confidence}
                      </Typography>
                    </Box>

                    <Stack spacing={1.5} sx={{ pl: 1 }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontWeight: 600 }}>FAULT SUMMARY</Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#cbd5e1', fontSize: '0.85rem' }}>{rcaDiagnosis.summary}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontWeight: 600 }}>ANALYSIS DETAILED TIMELINE</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.5 }}>{rcaDiagnosis.details}</Typography>
                      </Box>
                      <Box sx={{ bgcolor: 'rgba(99, 102, 241, 0.04)', p: 1.5, borderRadius: '8px', borderLeft: '3px solid #6366f1' }}>
                        <Typography variant="caption" sx={{ color: '#818cf8', display: 'block', fontWeight: 600, fontFamily: 'monospace' }}>RECOMMENDED FIX</Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#a5b4fc', fontSize: '0.85rem', mt: 0.5 }}>{rcaDiagnosis.action}</Typography>
                      </Box>
                    </Stack>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SummitSimulator;
