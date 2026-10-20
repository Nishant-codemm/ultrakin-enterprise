import React from 'react';
import { Shield, Globe, Terminal, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#04060A] border-t border-white/8 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="26" height="26" viewBox="0 0 512 512" aria-hidden="true">
                <defs>
                  <linearGradient id="uk-footer-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0" stopColor="#6366F1" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <g transform="scale(0.5)">
                  <path fill="url(#uk-footer-grad)" d="M330.356 86.2522C342.478 85.9997 354.602 85.8689 366.727 85.8599L580.96 86.3832L676.654 86.3259C753.016 86.4012 822.93 85.2832 880.952 143.088C904.457 166.401 921.034 195.778 928.839 227.951C938.241 265.521 937.534 301.715 937.542 339.944L937.551 422.35L937.803 650.62C937.914 733.528 943.816 813.617 880.318 876.291C826.894 929.021 763.845 932.179 692.749 932.047L434.426 932.05L349.698 932.053C276.335 932.06 202.404 933.033 145.915 878.63C99.1823 833.623 87.5023 779.903 86.6048 717.048C86.2967 680.398 86.2172 643.748 86.3663 607.097L86.3182 446.973L86.0964 356.582C85.9441 316.578 85.4229 273.293 93.9122 234.125C101.298 200.046 115.569 171.675 139.682 146.467C192.578 91.1721 258.366 87.1489 330.356 86.2522Z" />
                  <path fill="#07090E" d="M328.661 239.203C353.285 235.794 382.464 248.523 399.475 266.018C416.092 283.096 425.128 306.148 424.544 329.969C424.235 360.03 408.788 387.909 383.464 404.111C377.972 407.576 367.444 411.564 363.265 415.424C359.921 418.512 360.883 439.021 360.906 443.778L361.022 477.622C361.013 503.191 360.065 528.773 360.932 554.327C361.161 561.097 361.706 567.869 362.744 574.564C368.059 608.961 384.644 640.619 409.896 664.572C439.609 692.429 479.265 707.186 519.961 705.529C559.963 703.923 597.706 686.559 624.952 657.227C647.68 632.366 661.745 600.813 665.043 567.29C666.268 554.576 665.956 535.852 666.175 522.486C666.794 496.08 666.556 469.661 665.461 443.27C659.6 436.677 652.214 433.494 644.949 428.656C639.159 424.751 634.003 419.979 629.663 414.506C617.342 398.979 611.616 377.124 613.883 357.486C616.371 336.869 626.927 318.078 643.239 305.226C660.025 291.92 681.435 285.882 702.699 288.457C726.09 291.243 742.37 302.613 756.673 320.638C780.438 354.139 775.666 401.056 742.374 427.061C734.729 433.033 726.469 435.959 719.186 443.161C716.969 453.907 718.353 481.021 718.021 493.223C717.354 517.687 719.266 544.783 717.282 569.125C713.865 610.81 697.872 650.474 671.421 682.871C637.451 724.932 588.019 751.597 534.212 756.884C480.649 762.463 427.083 746.353 385.483 712.154C343.102 677.564 316.006 627.709 310.034 573.331C308.245 556.994 308.44 543.098 308.48 526.723L308.759 479.364L309.091 444.861C309.128 440.491 309.873 418.41 306.823 415.905C298.299 408.903 287.426 404.991 278.46 397.705C260.025 382.664 248.314 360.92 245.898 337.251C243.545 313.494 250.688 289.77 265.767 271.262C281.851 251.7 303.774 241.649 328.661 239.203Z" />
                  <circle fill="#6366F1" cx="349" cy="367" r="29" />
                </g>
              </svg>
              <span className="font-bold text-lg text-white tracking-tight">Ultrakin</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Your people, your tools, and your agents — finally in one app. Built from the ground up for high-velocity teams.
            </p>
            <div className="inline-flex items-center gap-3 p-2 px-3 rounded-full border border-white/8 bg-[#0F172A]/60 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> All systems operational
              </span>
              <span>·</span>
              <span className="font-mono text-slate-400">v2.4.0 (Enterprise)</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Product
            </div>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#modules" className="hover:text-white transition-colors">Spaces & Matrix Chat</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">Docs & Knowledge Vault</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">Custom Domain Mailbox</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">WebRTC Audio Huddles</a></li>
              <li><a href="#platform" className="hover:text-white transition-colors">Ukin Autonomous Agents</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Solutions
            </div>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Engineering & Dev</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product & Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Incident War Rooms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security & IT Ops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise Tier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Startups Program</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Trust & Legal
            </div>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#security" className="hover:text-white transition-colors">Security Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SOC 2 Type II Report</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Processing (DPA)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Subprocessors Directory</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Ultrakin Technologies, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com/ultrakin" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              X (Twitter)
            </a>
            <a href="https://github.com/ultrakin" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/company/ultrakin" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}