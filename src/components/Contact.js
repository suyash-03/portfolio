import { useState } from 'react';
import { Box, Container, Card, CardContent, Typography, Tooltip, Stack, Button } from '@mui/material';
import { Mail, Phone, Github, Linkedin, Download, CheckCircle2 } from 'lucide-react';
import SectionTitle from './SectionTitle';
import profilePhoto from '../profile.png';

const gradient = 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)';

const Contact = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendingStatus, setSendingStatus] = useState(''); // '', 'sending', 'success'

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } else {
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    }
  };

  const handleSmtpSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSendingStatus('sending');
    setTimeout(() => {
      setSendingStatus('success');
      const mailtoUrl = `mailto:suyash.singh9450@gmail.com?subject=Connection from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0DReply to: ${encodeURIComponent(email)}`;
      window.location.href = mailtoUrl;

      setTimeout(() => {
        setSendingStatus('');
        setName('');
        setEmail('');
        setMessage('');
      }, 3000);
    }, 1200);
  };

  return (
    <Box component="section" id="contact" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle number="06.">Connect</SectionTitle>
        <Typography color="text.secondary" sx={{ fontSize: '1.1rem', mb: 6, textAlign: 'center', maxWidth: 750, mx: 'auto', lineHeight: 1.7 }}>
          Let's build something resilient. I am always open to discussing low-latency backend architectures, distributed automation systems, or engineering opportunities. Ping my connection agent below.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
            gap: 4,
            alignItems: 'stretch'
          }}
        >
          {/* SMTP Terminal Form Card */}
          <Card className="bento-card smtp-console" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box className="terminal-header">
              <Box className="terminal-dots">
                <div className="dot red" />
                <div className="dot yellow" />
                <div className="dot green" />
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', opacity: 0.7 }}>
                smtp-connection-agent
              </Typography>
            </Box>

            <CardContent sx={{ p: { xs: 3.5, md: 4.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <form onSubmit={handleSmtpSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <Box>
                  {/* Line 1: Sender Name */}
                  <div className="smtp-input-line">
                    <span className="keyword">const</span>
                    <span className="variable">senderName</span>
                    <span>=</span>
                    <input
                      type="text"
                      className="smtp-input"
                      placeholder='"Your Name"'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={sendingStatus !== ''}
                    />
                    <span>;</span>
                  </div>

                  {/* Line 2: Sender Email */}
                  <div className="smtp-input-line">
                    <span className="keyword">const</span>
                    <span className="variable">senderEmail</span>
                    <span>=</span>
                    <input
                      type="email"
                      className="smtp-input"
                      placeholder='"your.email@domain.com"'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={sendingStatus !== ''}
                    />
                    <span>;</span>
                  </div>

                  {/* Line 3: Message Body */}
                  <Box sx={{ mb: 3.5 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#818cf8', display: 'block', mb: 1 }}>
                      {"// Write your connection payload here"}
                    </Typography>
                    <textarea
                      className="smtp-textarea"
                      placeholder="Enter message body..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={sendingStatus !== ''}
                      style={{ minHeight: 120 }}
                    />
                  </Box>
                </Box>

                {/* Submit Action */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                  <Box>
                    {sendingStatus === 'sending' && (
                      <Typography variant="caption" sx={{ color: 'secondary.main', fontFamily: 'monospace' }}>
                        📡 Sending package payload...
                      </Typography>
                    )}
                    {sendingStatus === 'success' && (
                      <Typography variant="caption" sx={{ color: '#10b981', fontFamily: 'monospace', fontWeight: 600 }}>
                        ✅ Mail client triggered!
                      </Typography>
                    )}
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    disabled={sendingStatus !== ''}
                    sx={{
                      background: gradient,
                      px: 3, py: 1.2,
                      fontSize: '0.85rem',
                      fontFamily: 'monospace',
                      boxShadow: '0 4px 15px rgba(99, 102, 241, 0.25)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)'
                      }
                    }}
                  >
                    $ npm run send-mail
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>

          {/* Interactive Access ID Badge */}
          <Card className="id-badge-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="id-badge-glow" />
            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'space-between', flexGrow: 1 }}>
              
              {/* Badge Header info */}
              <Box sx={{ width: '100%', borderBottom: '1px dashed rgba(255,255,255,0.1)', pb: 2.5, mb: 3.5, textAlign: 'center' }}>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'primary.light', letterSpacing: '0.15em', fontWeight: 600 }}>
                  SYSTEM ACCESS IDENTIFIER
                </Typography>
              </Box>

              {/* Holder Profile */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Box sx={{ width: 85, height: 85, borderRadius: '50%', border: '2px solid #06b6d4', p: 0.5, mb: 2, position: 'relative' }}>
                  <img
                    src={profilePhoto}
                    alt="Suyash Singh Badge"
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      width: 14, height: 14, borderRadius: '50%', bgcolor: '#10b981', border: '2px solid #09090d',
                      position: 'absolute', bottom: 2, right: 2,
                      boxShadow: '0 0 10px #10b981',
                      animation: 'pulse 2s infinite'
                    }}
                  />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Suyash Singh</Typography>
                <Typography variant="caption" sx={{ color: 'primary.light', fontFamily: 'monospace', mb: 2 }}>
                  LEVEL 2 • BACKEND SYSTEMS
                </Typography>

                {/* Grid details */}
                <Stack spacing={1} sx={{ width: '100%', px: 2, textAlign: 'left', mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', pb: 0.8, gap: 4 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>DESIGNATION:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>SWE 2 @ MICRON</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', pb: 0.8, gap: 4 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>ALMA MATER:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>BITS PILANI</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', pb: 0.8, gap: 4 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>LOCATION:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>BANGALORE, IN</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 0.8, gap: 4 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>STATUS:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#10b981' }}>CONNECT_READY</Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Action Docks */}
              <Box sx={{ width: '100%', borderTop: '1px dashed rgba(255,255,255,0.1)', pt: 3.5, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Tooltip title={emailCopied ? "Copied!" : "Copy Email"}>
                  <div className="social-dock-btn" onClick={() => copyText('suyash.singh9450@gmail.com', 'email')}>
                    {emailCopied ? <CheckCircle2 size={20} color="#10b981" /> : <Mail size={20} />}
                  </div>
                </Tooltip>

                <Tooltip title={phoneCopied ? "Copied!" : "Copy Phone"}>
                  <div className="social-dock-btn" onClick={() => copyText('+917007038266', 'phone')}>
                    {phoneCopied ? <CheckCircle2 size={20} color="#10b981" /> : <Phone size={20} />}
                  </div>
                </Tooltip>

                <Tooltip title="GitHub Profile">
                  <a href="https://github.com/suyash-03" target="_blank" rel="noopener noreferrer" className="social-dock-btn">
                    <Github size={20} />
                  </a>
                </Tooltip>

                <Tooltip title="LinkedIn Connection">
                  <a href="https://www.linkedin.com/in/suyash-singh-bb9477203/" target="_blank" rel="noopener noreferrer" className="social-dock-btn">
                    <Linkedin size={20} />
                  </a>
                </Tooltip>

                <Tooltip title="Download CV">
                  <a href="https://drive.google.com/file/d/1BfFVKido3JBLXqRoP-2U2lB2pFr0PoN2/view?usp=share_link" target="_blank" rel="noopener noreferrer" className="social-dock-btn">
                    <Download size={20} />
                  </a>
                </Tooltip>
              </Box>

            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
