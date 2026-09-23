"use client";

import * as React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class LenisErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Lenis Smooth Scroll Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // If SmoothScroll fails, we just render the children normally without Lenis
      return <>{this.props.children}</>;
    }

    return this.props.children;
  }
}
