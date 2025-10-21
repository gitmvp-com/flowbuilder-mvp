import { FC, memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import './HttpRequestNode.css';

const HttpRequestNode: FC<NodeProps> = ({ data, id }) => {
  const [config, setConfig] = useState(data.config || { method: 'GET', url: '' });

  const updateConfig = (key: string, value: string) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    data.config = newConfig; // Update the node data
  };

  return (
    <div className="http-request-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <span className="node-icon">🌐</span>
        <span className="node-title">HTTP Request</span>
      </div>
      <div className="node-body">
        <div className="form-group">
          <label>Method</label>
          <select
            value={config.method}
            onChange={(e) => updateConfig('method', e.target.value)}
            className="form-select"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>
        <div className="form-group">
          <label>URL</label>
          <input
            type="text"
            value={config.url}
            onChange={(e) => updateConfig('url', e.target.value)}
            placeholder="https://api.example.com"
            className="form-input"
          />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(HttpRequestNode);
