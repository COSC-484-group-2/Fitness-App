export function PageSection({ title, action, children }) {
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between w-full">
                <p className="text-3xl md:text-4xl font-bold">{title}</p>
                {action}
            </div>
            <div>
                {children}
            </div>
        </div>
    );
    
}