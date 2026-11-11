export const teamData = [
  { name: 'Valencia Putri Krisdiana', role: 'Ketua Tim', initials: 'VK', image: '/images/team/valencia-putri-krisdiana.jpg' },
  { name: 'Fadhil Muhammad Daffa', role: 'Anggota Tim', initials: 'FD', image: '/images/team/fadhil-muhammad-daffa.jpg' },
  { name: 'Novem Fidyansa Ningrum', role: 'Anggota Tim', initials: 'NN', image: '/images/team/novem-fidyansa-ningrum.jpg' },
  { name: 'Azarya Mikhael Nunumete', role: 'Anggota Tim', initials: 'AN', image: '/images/team/azarya-mikhael-nunumete.jpg' },
  { name: 'Nathaniel Prawira Syahdia', role: 'Anggota Tim', initials: 'NS', image: '/images/team/nathaniel-prawira-syahdia.jpg' },
]

// Only request portraits that exist; adding the prepared files replaces initials on rebuild.
const portraitFiles = import.meta.glob('/public/images/team/*.{jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' })
export const availablePortraits = new Set(Object.keys(portraitFiles).map((path) => path.replace('/public', '')))
