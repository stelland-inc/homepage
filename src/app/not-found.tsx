import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: '#FFF8F3',
        backgroundImage: 'radial-gradient(rgba(55,75,115,0.08) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      <div className="text-center px-6">
        <p className="text-[#FF8197] text-sm tracking-[0.3em] uppercase">404</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold uppercase tracking-tight text-[#374B73]">
          Page not found
        </h1>
        <p className="mt-6 text-[#374B73]/60">
          찾으시는 페이지를 찾을 수 없습니다.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-[#374B73] text-white px-10 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-[#FF8197] transition-colors duration-300"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
