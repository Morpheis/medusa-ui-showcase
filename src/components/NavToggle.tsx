import { Button } from '@medusajs/ui'
import { useNavigate, useLocation } from 'react-router-dom'

export function NavToggle() {
  const navigate = useNavigate()
  const location = useLocation()
  const isPopulated = location.pathname === '/populated'

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
      <Button
        variant={isPopulated ? 'primary' : 'secondary'}
        size="small"
        onClick={() => navigate('/populated')}
      >
        Populated
      </Button>
      <Button
        variant={!isPopulated ? 'primary' : 'secondary'}
        size="small"
        onClick={() => navigate('/empty')}
      >
        Empty
      </Button>
    </div>
  )
}
