import { createLazyFileRoute } from '@tanstack/react-router'
import ImageLinear from '../shared/components/ImageLinear'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <ImageLinear>
            <p>This is the content inside ImageLinear component.</p>
        </ImageLinear>

    )
}