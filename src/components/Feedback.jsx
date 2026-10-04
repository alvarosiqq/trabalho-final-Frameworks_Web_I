import { Panel, Button } from '../styles';

export default function Feedback({ loading = false, message, onRetry }) {
  return (
    <Panel role={loading ? 'status' : 'alert'} aria-live="polite">
      <p>{message}</p>
      {onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
    </Panel>
  );
}
